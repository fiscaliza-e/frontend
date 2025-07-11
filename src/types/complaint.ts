export interface ComplaintRequest {
  title: string;
  description: string;
  departmentId: number;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  attachments?: File[];
}

export interface ComplaintResponse {
  success: boolean;
  data: Complaint;
  message?: string;
}

export interface Complaint {
  id: number;
  userId: number;
  cityHallUserId?: number;
  departmentId: number;
  addressId: number;
  title: string;
  description: string;
  status: ComplaintStatus;
  complaintDate: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  department?: {
    id: number;
    name: string;
  };
  address?: {
    id: number;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  attachments?: ComplaintAttachment[];
  resolutions?: Resolution[];
}

export interface ComplaintAttachment {
  id: number;
  complaintId: number;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
}

export interface Resolution {
  id: number;
  complaintId: number;
  cityHallUserId: number;
  description: string;
  status: ResolutionStatus;
  createdAt: string;
  updatedAt: string;
  attachments?: ResolutionAttachment[];
}

export interface ResolutionAttachment {
  id: number;
  resolutionId: number;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
}

export type ComplaintStatus = 
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'REJECTED'
  | 'CLOSED';

export type ResolutionStatus = 
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'REJECTED';

export interface ComplaintFilters {
  status?: ComplaintStatus;
  departmentId?: number;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ComplaintListResponse {
  success: boolean;
  data: {
    complaints: Complaint[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message?: string;
} 