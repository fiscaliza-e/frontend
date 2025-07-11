import { apiClient, ApiResponse } from '../lib/api-client';
import { Department, DepartmentResponse, DepartmentListResponse } from '../types/department';

class DepartmentService {
  private readonly baseUrl = '/departments';

  async getDepartments(): Promise<DepartmentListResponse> {
    try {
      const response = await apiClient.get<DepartmentListResponse>(this.baseUrl);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar departamentos');
    }
  }

  async getDepartmentById(id: number): Promise<DepartmentResponse> {
    try {
      const response = await apiClient.get<DepartmentResponse>(`${this.baseUrl}/${id}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar departamento');
    }
  }
}

export const departmentService = new DepartmentService(); 