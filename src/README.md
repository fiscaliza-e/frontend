# Estrutura de API e Hooks

Esta documentação explica como usar a estrutura de vinculação com o backend criada para o projeto integrador.

## 📁 Estrutura de Arquivos

```
src/
├── lib/
│   ├── api-client.ts         # Cliente HTTP base com axios
│   └── index.ts              # Exportações da lib
├── services/
│   ├── auth-service.ts       # Serviços de autenticação
│   ├── complaint-service.ts  # Serviços de reclamações
│   ├── department-service.ts # Serviços de departamentos
│   ├── user-service.ts       # Serviços de usuários
│   └── index.ts              # Exportações dos serviços
├── hooks/
│   ├── use-auth.ts           # Hook para autenticação
│   ├── use-complaints.ts     # Hook para reclamações
│   ├── use-departments.ts    # Hook para departamentos
│   ├── use-users.ts          # Hook para usuários
│   └── index.ts              # Exportações dos hooks
├── types/
│   ├── auth.ts               # Tipos de autenticação
│   ├── complaint.ts          # Tipos de reclamações
│   ├── department.ts         # Tipos de departamentos
│   └── index.ts              # Exportações dos tipos
├── components/
│   ├── login-form.tsx        # Formulário de login
│   └── complaint-form.tsx    # Formulário de reclamação
└── app/
    └── test-api/
        └── page.tsx          # Página de teste de conectividade
```

## 🚀 Configuração Inicial

### 1. Configurar URL da API

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 2. Configurar o AuthProvider

No seu `_app.tsx` ou layout principal:

```tsx
import { AuthProvider } from '../hooks/use-auth';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
```

## 🧪 Teste de Conectividade

Acesse `/test-api` para testar a conectividade com o backend:

- Verifica se o backend está respondendo
- Testa o endpoint `/users`
- Mostra informações da API
- Interface visual para debug

## 🔐 Autenticação

### Hook useAuth

```tsx
import { useAuth } from '../hooks/use-auth';

function MyComponent() {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    login, 
    logout, 
    register 
  } = useAuth();

  const handleLogin = async () => {
    try {
      await login({
        email: 'user@example.com',
        password: 'password123'
      });
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  if (isLoading) return <div>Carregando...</div>;
  
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div>
      <h1>Bem-vindo, {user?.name}!</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

### Serviço de Autenticação

```tsx
import { authService } from '../services/auth-service';

const response = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});
```

## 📝 Reclamações

### Hook useComplaints

```tsx
import { useComplaints } from '../hooks/use-complaints';

function ComplaintsList() {
  const {
    complaints,
    isLoading,
    error,
    fetchComplaints,
    createComplaint
  } = useComplaints();

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  return (
    <div>
      {complaints.map(complaint => (
        <div key={complaint.id}>
          <h3>{complaint.title}</h3>
          <p>{complaint.description}</p>
        </div>
      ))}
    </div>
  );
}
```

## 👥 Usuários

### Hook useUsers

```tsx
import { useUsers } from '../hooks/use-users';

function UsersList() {
  const { users, isLoading, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
```

## 🏢 Departamentos

### Hook useDepartments

```tsx
import { useDepartments } from '../hooks/use-departments';

function DepartmentSelect() {
  const { departments, isLoading } = useDepartments();

  return (
    <select disabled={isLoading}>
      {departments.map(dept => (
        <option key={dept.id} value={dept.id}>
          {dept.name}
        </option>
      ))}
    </select>
  );
}
```

## 🔧 Configurações Avançadas

### Interceptors Personalizados

O cliente API inclui interceptors para:
- Adicionar token de autenticação automaticamente
- Redirecionar para login em caso de token expirado
- Tratar erros de rede

### Upload de Arquivos

Para upload de arquivos (anexos), use FormData:

```tsx
const formData = new FormData();
formData.append('file', file);

const response = await complaintService.addAttachments(1, [file]);
```

### Tratamento de Erros

Todos os serviços incluem tratamento de erros:

```tsx
try {
  const response = await complaintService.createComplaint(data);
} catch (error) {
  console.error(error.message);
}
```

## 📋 Tipos TypeScript

Todos os tipos estão disponíveis para importação:

```tsx
import { 
  Complaint, 
  ComplaintRequest, 
  User, 
  LoginRequest 
} from '../types';
```

## 🎯 Exemplos de Uso

### Página de Login

```tsx
import { LoginForm } from '../components/login-form';

export default function LoginPage() {
  return (
    <div style={{ padding: 20 }}>
      <LoginForm 
        onSuccess={() => router.push('/dashboard')}
        onRegisterClick={() => router.push('/register')}
      />
    </div>
  );
}
```

### Página de Reclamações

```tsx
import { ComplaintForm } from '../components/complaint-form';

export default function NewComplaintPage() {
  return (
    <div style={{ padding: 20 }}>
      <ComplaintForm 
        onSuccess={() => router.push('/complaints')}
        onCancel={() => router.back()}
      />
    </div>
  );
}
```

## 🔒 Segurança

- Tokens são armazenados no localStorage
- Interceptors automáticos para renovação de tokens
- Redirecionamento automático em caso de token expirado
- Validação de autenticação em cada requisição

## 🚨 Troubleshooting

### Erro de CORS
Certifique-se de que o backend está configurado para aceitar requisições do frontend.

### Token não encontrado
Verifique se o usuário está logado e se o token está sendo salvo corretamente.

### Erro 401
O token pode ter expirado. O sistema redirecionará automaticamente para o login.

### Erro de rede
Verifique se a URL da API está correta no arquivo `.env.local`.

### Teste de Conectividade
Use a página `/test-api` para verificar se o backend está respondendo corretamente. 