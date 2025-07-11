import { useState, useCallback } from 'react';
import { userService } from '../services/user-service';

interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  createdAt: string;
  updatedAt: string;
}

interface UsersState {
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

interface UseUsersReturn extends UsersState {
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: number) => Promise<void>;
  clearError: () => void;
  clearCurrentUser: () => void;
}

export function useUsers(): UseUsersReturn {
  const [state, setState] = useState<UsersState>({
    users: [],
    currentUser: null,
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

  const clearCurrentUser = useCallback(() => {
    setState(prev => ({ ...prev, currentUser: null }));
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await userService.getUsers();
      
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          users: response.data,
          isLoading: false,
        }));
      } else {
        throw new Error(response.message || 'Erro ao buscar usuários');
      }
    } catch (error: any) {
      setError(error.message || 'Erro ao buscar usuários');
      setLoading(false);
    }
  }, [setLoading, setError]);

  const fetchUserById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await userService.getUserById(id);
      
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          currentUser: response.data,
          isLoading: false,
        }));
      } else {
        throw new Error(response.message || 'Erro ao buscar usuário');
      }
    } catch (error: any) {
      setError(error.message || 'Erro ao buscar usuário');
      setLoading(false);
    }
  }, [setLoading, setError]);

  return {
    ...state,
    fetchUsers,
    fetchUserById,
    clearError,
    clearCurrentUser,
  };
} 