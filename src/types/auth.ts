export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  cpf: string;
  name: string;
  email: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: {
      id: number;
      cpf: string;
      name: string;
      email: string;
      birthDate: string;
      address: {
        id: number;
        street: string;
        number: string;
        complement?: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
      };
    };
    token: string;
    refreshToken: string;
  };
  message?: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  data: {
    token: string;
    refreshToken: string;
  };
  message?: string;
}

export interface User {
  id: number;
  cpf: string;
  name: string;
  email: string;
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

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
} 