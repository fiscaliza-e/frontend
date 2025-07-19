import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { authService } from '../services/auth-service';
import { tokenService } from '../services/token-service';
import { storageUtils } from '../lib/storage-utils';
import { User, LoginRequest, RegisterRequest, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  refreshAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const user = typeof window !== 'undefined' ? storageUtils.getItem('user', false) : null;
    const token = typeof window !== 'undefined' ? storageUtils.getItem('auth_token') : null;
    const refreshToken = typeof window !== 'undefined' ? storageUtils.getItem('refresh_token') : null;
    return {
      user: user ? JSON.parse(user) : null,
      token: token || null,
      refreshToken: refreshToken || null,
      isAuthenticated: !!token && tokenService.isSessionActive(),
      isLoading: true,
      error: null,
    };
  });

  const refreshAuth = async (): Promise<boolean> => {
    try {
      const result = await authService.refreshToken();
      if (result) {
        const user = await authService.validateToken();
        if (user) {
          storageUtils.setItem('user', JSON.stringify(user), false);
          setAuthState({
            user,
            token: result.token,
            refreshToken: result.refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      return false;
    }
  };

  useEffect(() => {
    const validateAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
                      const user = await authService.validateToken();
            if (user) {
              const token = storageUtils.getItem('auth_token');
              const refreshToken = storageUtils.getItem('refresh_token');
              storageUtils.setItem('user', JSON.stringify(user), false);
              setAuthState({
                user,
                token,
                refreshToken,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
                    } else {
          const refreshSuccess = await refreshAuth();
          if (!refreshSuccess) {
            console.log('Falha na renovação inicial, mas mantendo sessão ativa');
          }
        }
        } else {
          console.log('Usuário não autenticado, mas mantendo dados salvos');
          setAuthState(prev => ({
            ...prev,
            isAuthenticated: false,
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error('Erro ao validar autenticação:', error);
        setAuthState(prev => ({
          ...prev,
          isAuthenticated: false,
          isLoading: false,
          error: 'Erro ao validar autenticação',
        }));
      }
    };
    validateAuth();
  }, []);

  useEffect(() => {
    if (authState.isAuthenticated && authState.token) {
      const checkAndRefreshToken = async () => {
        if (tokenService.shouldRefreshToken()) {
          await refreshAuth();
        }
      };
      const refreshInterval = setInterval(checkAndRefreshToken, 5 * 60 * 1000);
      return () => clearInterval(refreshInterval);
    }
  }, [authState.isAuthenticated, authState.token]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && authState.isAuthenticated) {
        tokenService.updateLastActivity();
        if (tokenService.shouldRefreshToken()) {
          refreshAuth();
        }
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token' || e.key === 'refresh_token') {
        window.location.reload();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [authState.isAuthenticated]);

  const login = async (credentials: LoginRequest) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const { user, token, refreshToken } = await authService.login(credentials);
      storageUtils.setItem('user', JSON.stringify(user), false);
      storageUtils.setItem('auth_token', token);
      storageUtils.setItem('refresh_token', refreshToken);
      setAuthState({
        user,
        token,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Erro ao fazer login',
      }));
      throw error;
    }
  };

  const register = async (userData: RegisterRequest) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await authService.register(userData);
      if (response.success && response.data) {
        storageUtils.setItem('user', JSON.stringify(response.data.user), false);
        storageUtils.setItem('auth_token', response.data.token);
        storageUtils.setItem('refresh_token', response.data.refreshToken);
        setAuthState({
          user: response.data.user,
          token: response.data.token,
          refreshToken: response.data.refreshToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || 'Erro no registro');
      }
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Erro ao registrar usuário',
      }));
      throw error;
    }
  };

  const logout = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      await authService.logout();
      storageUtils.removeItem('user');
      storageUtils.removeItem('auth_token');
      storageUtils.removeItem('refresh_token');
      setAuthState({
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Erro ao fazer logout',
      }));
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await authService.updateProfile(userData);
      
      if (response.success && response.data) {
        setAuthState(prev => ({
          ...prev,
          user: response.data,
          isLoading: false,
        } as AuthState));
      } else {
        throw new Error(response.message || 'Erro ao atualizar perfil');
      }
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Erro ao atualizar perfil',
      }));
      throw error;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await authService.changePassword(currentPassword, newPassword);
      
      if (response.success) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      } else {
        throw new Error(response.message || 'Erro ao alterar senha');
      }
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Erro ao alterar senha',
      }));
      throw error;
    }
  };

  const forgotPassword = async (email: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await authService.forgotPassword(email);
      
      if (response.success) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      } else {
        throw new Error(response.message || 'Erro ao solicitar redefinição de senha');
      }
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Erro ao solicitar redefinição de senha',
      }));
      throw error;
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await authService.resetPassword(token, newPassword);
      
      if (response.success) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      } else {
        throw new Error(response.message || 'Erro ao redefinir senha');
      }
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Erro ao redefinir senha',
      }));
      throw error;
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
} 