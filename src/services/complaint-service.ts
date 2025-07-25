import { apiClient, ApiResponse } from '../lib/api-client';
import {
  ComplaintRequest,
  ComplaintResponse,
  ComplaintListResponse,
  Complaint,
  ComplaintFilters,
  ComplaintAttachment,
  Resolution
} from '../types/complaint';

class ComplaintService {
  private readonly baseUrl = '/complaints';

  async getComplaints(filters?: ComplaintFilters): Promise<ComplaintListResponse> {
    try {
      const params = new URLSearchParams();
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }

      const response = await apiClient.get<ComplaintListResponse>(
        `${this.baseUrl}?${params.toString()}`
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar reclamações');
    }
  }

  async getComplaintById(id: number): Promise<ComplaintResponse> {
    try {
      const response = await apiClient.get<ComplaintResponse>(`${this.baseUrl}/${id}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar reclamação');
    }
  }

  async createComplaint(complaintData: ComplaintRequest): Promise<ComplaintResponse> {
    try {
      const formData = new FormData();
      
      formData.append('title', complaintData.title);
      formData.append('description', complaintData.description);
      formData.append('departmentId', complaintData.departmentId.toString());
      
      formData.append('address[street]', complaintData.address.street);
      formData.append('address[number]', complaintData.address.number);
      if (complaintData.address.complement) {
        formData.append('address[complement]', complaintData.address.complement);
      }
      formData.append('address[neighborhood]', complaintData.address.neighborhood);
      formData.append('address[city]', complaintData.address.city);
      formData.append('address[state]', complaintData.address.state);
      formData.append('address[zipCode]', complaintData.address.zipCode);
      
      if (complaintData.attachments) {
        complaintData.attachments.forEach((file, index) => {
          formData.append(`attachments[${index}]`, file);
        });
      }

      const response = await apiClient.post<ComplaintResponse>(
        this.baseUrl,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao criar reclamação');
    }
  }

  async createComplaintRaw(payload: any): Promise<any> {
    return apiClient.post("/complaints", payload);
  }

  async updateComplaint(
    id: number,
    complaintData: Partial<ComplaintRequest>
  ): Promise<ComplaintResponse> {
    try {
      const response = await apiClient.patch<ComplaintResponse>(
        `${this.baseUrl}/${id}`,
        complaintData
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar reclamação');
    }
  }

  async deleteComplaint(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao remover reclamação');
    }
  }

  async addAttachments(
    complaintId: number,
    files: File[]
  ): Promise<ApiResponse<ComplaintAttachment[]>> {
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file);
      });

      const response = await apiClient.post<ApiResponse<ComplaintAttachment[]>>(
        `${this.baseUrl}/${complaintId}/attachments`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao adicionar anexos');
    }
  }

  async removeAttachment(
    complaintId: number,
    attachmentId: number
  ): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.delete<ApiResponse<void>>(
        `${this.baseUrl}/${complaintId}/attachments/${attachmentId}`
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao remover anexo');
    }
  }

  async getResolutions(complaintId: number): Promise<ApiResponse<Resolution[]>> {
    try {
      const response = await apiClient.get<ApiResponse<Resolution[]>>(
        `${this.baseUrl}/${complaintId}/resolutions`
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar resoluções');
    }
  }

  async addResolution(
    complaintId: number,
    resolutionData: {
      description: string;
      status: string;
      attachments?: File[];
    }
  ): Promise<ApiResponse<Resolution>> {
    try {
      const formData = new FormData();
      formData.append('description', resolutionData.description);
      formData.append('status', resolutionData.status);
      
      if (resolutionData.attachments) {
        resolutionData.attachments.forEach((file, index) => {
          formData.append(`attachments[${index}]`, file);
        });
      }

      const response = await apiClient.post<ApiResponse<Resolution>>(
        `${this.baseUrl}/${complaintId}/resolutions`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao adicionar resolução');
    }
  }

  async updateComplaintStatus(
    complaintId: number,
    status: string
  ): Promise<ComplaintResponse> {
    try {
      const response = await apiClient.patch<ComplaintResponse>(
        `${this.baseUrl}/${complaintId}/status`,
        { status }
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar status');
    }
  }

  async getComplaintStats(): Promise<ApiResponse<{
    total: number;
    pending: number;
    inProgress: number;
    resolved: number;
    rejected: number;
    closed: number;
  }>> {
    try {
      const response = await apiClient.get<ApiResponse<any>>(`${this.baseUrl}/stats`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar estatísticas');
    }
  }

  async getComplaintStatuses(): Promise<string[]> {
    const response = await apiClient.get<string[]>("/complaints/system/statuses");
    return response;
  }

  async createAddress(address: any): Promise<{ id: number }> {
    const payload = {
      street: address.street,
      neighborhood: address.neighborhood,
      number: address.number ? parseInt(address.number, 10) : undefined,
      zip_code: address.zipCode ? parseInt(address.zipCode, 10) : undefined,
      city: address.city,
      state: address.state,
    };
    return apiClient.post("/addresses", payload);
  }
}

export const complaintService = new ComplaintService(); 