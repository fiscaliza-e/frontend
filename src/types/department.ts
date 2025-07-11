export interface Department {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentResponse {
  success: boolean;
  data: Department;
  message?: string;
}

export interface DepartmentListResponse {
  success: boolean;
  data: Department[];
  message?: string;
} 