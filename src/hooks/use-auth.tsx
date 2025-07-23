import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { authService } from '../services/auth-service';
import { userService } from '../services/user-service';
import { tokenService } from '../services/token-service';
import { storageUtils } from '../lib/storage-utils';
import { User, LoginRequest, RegisterRequest, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
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
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const refreshAuth = async (): Promise<boolean> => {
    try {
      const result = await authService.refreshToken();
      if (result) {
        const user = await userService.getCurrentUser();
        if (user) {
                  storageUtils.setItem('user', JSON.stringify(user), false);
        tokenService.setTokens(result.token, result.refreshToken);
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
    const initializeAuth = async () => {
      try {
        const user = storageUtils.getItem('user', false);
        const token = tokenService.getToken();
        const refreshToken = tokenService.getRefreshToken();
        
        if (user && token && tokenService.hasValidToken()) {
          const parsedUser = JSON.parse(user);
          setAuthState({
            user: parsedUser,
            token,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState(prev => ({
            ...prev,
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
        }));
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        if (authState.isAuthenticated && authState.token) {
          try {
            const user = await userService.getCurrentUser();
            if (user) {
              storageUtils.setItem('user', JSON.stringify(user), false);
              setAuthState(prev => ({
                ...prev,
                user,
                isLoading: false,
              }));
            } else {
              const refreshSuccess = await refreshAuth();
              if (!refreshSuccess) {
                console.log('Falha na renovação inicial');
              }
            }
          } catch (error) {
            const refreshSuccess = await refreshAuth();
            if (!refreshSuccess) {
              console.log('Falha na renovação inicial');
            }
          }
        }
      } catch (error) {
        console.error('Erro ao validar autenticação:', error);
      }
    };

    if (authState.isAuthenticated && !authState.isLoading) {
      validateAuth();
    }
  }, [authState.isAuthenticated, authState.token]);

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
      tokenService.setTokens(token, refreshToken);
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
        tokenService.setTokens(response.data.token, response.data.refreshToken);
        setAuthState({
          user: response.data.user as unknown as User,
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
      tokenService.clearTokens();
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