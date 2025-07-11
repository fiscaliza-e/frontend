import { apiClient, ApiResponse } from '../lib/api-client';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  User 
} from '../types/auth';

class AuthService {
  private readonly baseUrl = '/auth';

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        `${this.baseUrl}/login`,
        credentials
      );

      if (response.success && response.data?.token) {
        apiClient.setToken(response.data.token);
      }

      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        `${this.baseUrl}/register`,
        userData
      );

      if (response.success && response.data?.token) {
        apiClient.setToken(response.data.token);
      }

      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao registrar usuário');
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(`${this.baseUrl}/logout`);
    } catch (error) {
    } finally {
      apiClient.logout();
    }
  }

  async validateToken(): Promise<User | null> {
    try {
      const response = await apiClient.get<ApiResponse<User>>(`${this.baseUrl}/me`);
      return response.success ? response.data || null : null;
    } catch (error) {
      apiClient.logout();
      return null;
    }
  }

  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response = await apiClient.put<ApiResponse<User>>(
        `${this.baseUrl}/profile`,
        userData
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar perfil');
    }
  }

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post<ApiResponse<void>>(
        `${this.baseUrl}/change-password`,
        {
          currentPassword,
          newPassword,
        }
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao alterar senha');
    }
  }

  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post<ApiResponse<void>>(
        `${this.baseUrl}/forgot-password`,
        { email }
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao solicitar redefinição de senha');
    }
  }

  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post<ApiResponse<void>>(
        `${this.baseUrl}/reset-password`,
        {
          token,
          newPassword,
        }
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao redefinir senha');
    }
  }

  isAuthenticated(): boolean {
    return apiClient.isAuthenticated();
  }
}

export const authService = new AuthService(); 