import { useState, useCallback } from 'react';
import { complaintService } from '../services/complaint-service';
import {
  Complaint,
  ComplaintRequest,
  ComplaintFilters,
  ComplaintAttachment,
  Resolution,
  ComplaintStatus
} from '../types/complaint';

interface ComplaintsState {
  complaints: Complaint[];
  currentComplaint: Complaint | null;
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface UseComplaintsReturn extends ComplaintsState {
  fetchComplaints: (filters?: ComplaintFilters) => Promise<void>;
  fetchComplaintById: (id: number) => Promise<void>;
  createComplaint: (complaintData: ComplaintRequest) => Promise<Complaint>;
  updateComplaint: (id: number, complaintData: Partial<ComplaintRequest>) => Promise<Complaint>;
  deleteComplaint: (id: number) => Promise<void>;
  addAttachments: (complaintId: number, files: File[]) => Promise<ComplaintAttachment[]>;
  removeAttachment: (complaintId: number, attachmentId: number) => Promise<void>;
  fetchResolutions: (complaintId: number) => Promise<Resolution[]>;
  addResolution: (
    complaintId: number,
    resolutionData: {
      description: string;
      status: string;
      attachments?: File[];
    }
  ) => Promise<Resolution>;
  updateComplaintStatus: (complaintId: number, status: ComplaintStatus) => Promise<Complaint>;
  clearError: () => void;
  clearCurrentComplaint: () => void;
}

export function useComplaints(): UseComplaintsReturn {
  const [state, setState] = useState<ComplaintsState>({
    complaints: [],
    currentComplaint: null,
    isLoading: false,
    error: null,
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  const clearCurrentComplaint = useCallback(() => {
    setState(prev => ({ ...prev, currentComplaint: null }));
  }, []);

  const fetchComplaints = useCallback(async (filters?: ComplaintFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await complaintService.getComplaints(filters);
      
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          complaints: response.data.complaints,
          total: response.data.total,
          page: response.data.page,
          limit: response.data.limit,
          totalPages: response.data.totalPages,
          isLoading: false,
        }));
      } else {
        throw new Error(response.message || 'Erro ao buscar reclamações');
      }
    } catch (error: any) {
      setError(error.message || 'Erro ao buscar reclamações');
      setLoading(false);
    }
  }, [setLoading, setError]);

  const fetchComplaintById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await complaintService.getComplaintById(id);
      
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          currentComplaint: response.data,
          isLoading: false,
        }));
      } else {
        throw new Error(response.message || 'Erro ao buscar reclamação');
      }
    } catch (error: any) {
      setError(error.message || 'Erro ao buscar reclamação');
      setLoading(false);
    }
  }, [setLoading, setError]);

  const createComplaint = useCallback(async (complaintData: ComplaintRequest): Promise<Complaint> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await complaintService.createComplaint(complaintData);
      
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          complaints: [response.data, ...prev.complaints],
          isLoading: false,
        }));
        return response.data;
      } else {
        throw new Error(response.message || 'Erro ao criar reclamação');
      }
    } catch (error: any) {
      setError(error.message || 'Erro ao criar reclamação');
      setLoading(false);
      throw error;
    }
  }, [setLoading, setError]);

  const updateComplaint = useCallback(async (
    id: number,
    complaintData: Partial<ComplaintRequest>
  ): Promise<Complaint> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await complaintService.updateComplaint(id, complaintData);
      
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          complaints: prev.complaints.map(complaint =>
            complaint.id === id ? response.data : complaint
          ),
          currentComplaint: prev.currentComplaint?.id === id ? response.data : prev.currentComplaint,
          isLoading: false,
        }));
        return response.data;
      } else {
        throw new Error(response.message || 'Erro ao atualizar reclamação');
      }
    } catch (error: any) {
      setError(error.message || 'Erro ao atualizar reclamação');
      setLoading(false);
      throw error;
    }
  }, [setLoading, setError]);

  const deleteComplaint = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await complaintService.deleteComplaint(id);
      
      if (response.success) {
        setState(prev => ({
          ...prev,
          complaints: prev.complaints.filter(complaint => complaint.id !== id),
          currentComplaint: prev.currentComplaint?.id === id ? null : prev.currentComplaint,
          isLoading: false,
        }));
      } else {
        throw new Error(response.message || 'Erro ao remover reclamação');
      }
    } catch (error: any) {
      setError(error.message || 'Erro ao remover reclamação');
      setLoading(false);
      throw error;
    }
  }, [setLoading, setError]);

  const addAttachments = useCallback(async (
    complaintId: number,
    files: File[]
  ): Promise<ComplaintAttachment[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await complaintService.addAttachments(complaintId, files);
      
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          currentComplaint: prev.currentComplaint?.id === complaintId
            ? {
                ...prev.currentComplaint,
                attachments: [...(prev.currentComplaint.attachments || []), ...response.data],
              }
            : prev.currentComplaint,
          isLoading: false,
        }));
        return response.data;
      } else {
        throw new Error(response.message || 'Erro ao adicionar anexos');
      }
    } catch (error: any) {
      setError(error.message || 'Erro ao adicionar anexos');
      setLoading(false);
      throw error;
    }
  }, [setLoading, setError]);

  const removeAttachment = useCallback(async (complaintId: number, attachmentId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await complaintService.removeAttachment(complaintId, attachmentId);
      
      if (response.success) {
        setState(prev => ({
          ...prev,
          currentComplaint: prev.currentComplaint?.id === complaintId
            ? {
                ...prev.currentComplaint,
                attachments: prev.currentComplaint.attachments?.filter(
                  attachment => attachment.id !== attachmentId
                ) || [],
              }
            : prev.currentComplaint,
          isLoading: false,
        }));
      } else {
        throw new Error(response.message || 'Erro ao remover anexo');
      }
    } catch (error: any) {
      setError(error.message || 'Erro ao remover anexo');
      setLoading(false);
      throw error;
    }
  }, [setLoading, setError]);

  const fetchResolutions = useCallback(async (complaintId: number): Promise<Resolution[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await complaintService.getResolutions(complaintId);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || 'Erro ao buscar resoluções');
      }
    } catch (error: any) {
      setError(error.message || 'Erro ao buscar resoluções');
      setLoading(false);
      throw error;
    }
  }, [setLoading, setError]);

  const addResolution = useCallback(async (
    complaintId: number,
    resolutionData: {
      description: string;
      status: string;
      attachments?: File[];
    }
  ): Promise<Resolution> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await complaintService.addResolution(complaintId, resolutionData);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || 'Erro ao adicionar resolução');
      }
    } catch (error: any) {
      setError(error.message || 'Erro ao adicionar resolução');
      setLoading(false);
      throw error;
    }
  }, [setLoading, setError]);

  const updateComplaintStatus = useCallback(async (
    complaintId: number,
    status: ComplaintStatus
  ): Promise<Complaint> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await complaintService.updateComplaintStatus(complaintId, status);
      
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          complaints: prev.complaints.map(complaint =>
            complaint.id === complaintId ? response.data : complaint
          ),
          currentComplaint: prev.currentComplaint?.id === complaintId ? response.data : prev.currentComplaint,
          isLoading: false,
        }));
        return response.data;
      } else {
        throw new Error(response.message || 'Erro ao atualizar status');
      }
    } catch (error: any) {
      setError(error.message || 'Erro ao atualizar status');
      setLoading(false);
      throw error;
    }
  }, [setLoading, setError]);

  return {
    ...state,
    fetchComplaints,
    fetchComplaintById,
    createComplaint,
    updateComplaint,
    deleteComplaint,
    addAttachments,
    removeAttachment,
    fetchResolutions,
    addResolution,
    updateComplaintStatus,
    clearError,
    clearCurrentComplaint,
  };
} 