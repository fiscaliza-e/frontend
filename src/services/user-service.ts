import { apiClient, ApiResponse } from '../lib/api-client';
import { storageUtils } from '../lib/storage-utils';

interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  birth_date: string;
  created_on: string;
  updated_on: string;
  addresses: {
    id: number;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
  };
  role: {
    id: number;
    name: string;
    description: string;
  };
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

  async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get<User>(`${this.baseUrl}/user`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar usuário atual');
    }
  }

  async updateProfile(profileData: any): Promise<User> {
    try {
      console.log('🔍 userService.updateProfile - Dados enviados:', JSON.stringify(profileData, null, 2));
      
      const response = await apiClient.put<User>(`${this.baseUrl}/profile`, profileData);
      
      console.log('🔍 userService.updateProfile - Resposta recebida:', JSON.stringify(response, null, 2));
      
      // Atualizar o usuário no localStorage
      storageUtils.setItem('user', JSON.stringify(response), false);
      
      console.log('✅ userService.updateProfile - Usuário atualizado no cache:', JSON.stringify(response, null, 2));
      
      return response;
    } catch (error: any) {
      console.error('❌ userService.updateProfile - Erro:', error);
      throw new Error(error.response?.data?.message || 'Erro ao atualizar perfil');
    }
  }
}

export const userService = new UserService(); 