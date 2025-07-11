import { apiClient, ApiResponse } from '../lib/api-client';

interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  createdAt: string;
  updatedAt: string;
}

interface UserListResponse {
  success: boolean;
  data: User[];
  message?: string;
}

class UserService {
  private readonly baseUrl = '/users';

  async getUsers(): Promise<UserListResponse> {
    try {
      const response = await apiClient.get<UserListResponse>(this.baseUrl);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar usuários');
    }
  }

  async getUserById(id: number): Promise<ApiResponse<User>> {
    try {
      const response = await apiClient.get<ApiResponse<User>>(`${this.baseUrl}/${id}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar usuário');
    }
  }
}

export const userService = new UserService(); 