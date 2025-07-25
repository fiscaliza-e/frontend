import { useState, useCallback, useEffect } from 'react';
import { departmentService } from '../services/department-service';
import { Department } from '../types/department';

interface DepartmentsState {
  departments: Department[];
  isLoading: boolean;
  error: string | null;
}

interface UseDepartmentsReturn extends DepartmentsState {
  fetchDepartments: () => Promise<void>;
  clearError: () => void;
}

export function useDepartments(): UseDepartmentsReturn {
  const [state, setState] = useState<DepartmentsState>({
    departments: [],
    isLoading: false,
    error: null,
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

  const fetchDepartments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await departmentService.getDepartments();
      const departments = Array.isArray(response) ? response : response.data;
      setState(prev => ({
        ...prev,
        departments,
        isLoading: false,
      }));
    } catch (error: any) {
      setError(error.message || 'Erro ao buscar departamentos');
      setLoading(false);
    }
  }, [setLoading, setError]);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  return {
    ...state,
    fetchDepartments,
    clearError,
  };
} 