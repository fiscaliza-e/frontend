import { apiClient, ApiResponse } from "../lib/api-client";
import { storageUtils } from "../lib/storage-utils";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
} from "../types/auth";

class AuthService {
  private readonly baseUrl = "/auth";

  async login(
    credentials: LoginRequest
  ): Promise<{ user: any; token: string; refreshToken: string }> {
    try {
      const response = await apiClient.post<any>(
        `${this.baseUrl}/login`,
        credentials
      );

      if (response.access_token && response.user) {
        const refreshToken = response.refresh_token || response.access_token;
        apiClient.setTokens(response.access_token, refreshToken);
        return {
          user: response.user,
          token: response.access_token,
          refreshToken: refreshToken,
        };
      } else {
        throw new Error("Resposta de login inválida");
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao fazer login");
    }
  }

  async register(userData: RegisterRequest): Promise<any> {
    try {
      // 1. Criar endereço
      const addressPayload = {
        street: userData.address.street,
        neighborhood: userData.address.neighborhood,
        number: userData.address.number ? parseInt(userData.address.number, 10) : undefined,
        zip_code: userData.address.zipCode ? parseInt(userData.address.zipCode, 10) : undefined,
        city: userData.address.city,
        state: userData.address.state,
      };
      const addressRes = await apiClient.post<any>("/addresses", addressPayload);
      if (!addressRes.id) throw new Error("Erro ao criar endereço");
      // 2. Criar usuário
      const userPayload = {
        cpf: userData.cpf,
        name: userData.name,
        email: userData.email,
        birth_date: userData.birthDate,
        password: userData.password,
        addresses_id: addressRes.id,
        role_id: 1,
      };
      const userRes = await apiClient.post<any>("/users", userPayload);
      return userRes;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao registrar usuário");
    }
  }

  async logout(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken();
      if (refreshToken) {
        await apiClient.post(`${this.baseUrl}/logout`, {
          refresh_token: refreshToken,
        });
      }
    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      apiClient.logout();
    }
  }

  async refreshToken(): Promise<{
    token: string;
    refreshToken: string;
  } | null> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        return null;
      }

      const response = await apiClient.post<any>(`${this.baseUrl}/refresh`, {
        refresh_token: refreshToken,
      });

      if (response.access_token) {
        const newRefreshToken = response.refresh_token || response.access_token;
        apiClient.setTokens(response.access_token, newRefreshToken);
        return {
          token: response.access_token,
          refreshToken: newRefreshToken,
        };
      }
      return null;
    } catch (error) {
      console.error("Erro ao renovar token:", error);
      return null;
    }
  }

  async validateToken(): Promise<User | null> {
    try {
      const response = await apiClient.get<ApiResponse<User>>(
        `${this.baseUrl}/me`
      );
      return response.success ? response.data || null : null;
    } catch (error) {
      apiClient.logout();
      return null;
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
      throw new Error(error.response?.data?.message || "Erro ao alterar senha");
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
      throw new Error(
        error.response?.data?.message ||
          "Erro ao solicitar redefinição de senha"
      );
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
      throw new Error(
        error.response?.data?.message || "Erro ao redefinir senha"
      );
    }
  }

  isAuthenticated(): boolean {
    return apiClient.isAuthenticated();
  }

  private getRefreshToken(): string | null {
    if (typeof window !== "undefined") {
      return storageUtils.getItem("refresh_token");
    }
    return null;
  }
}

export const authService = new AuthService();
