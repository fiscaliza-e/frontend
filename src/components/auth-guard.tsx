import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/use-auth';
import { tokenService } from '../services/token-service';
import { Flex, Spin } from 'antd';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function AuthGuard({ 
  children, 
  requireAuth = true, 
  redirectTo = '/login' 
}: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo);
      } else if (!requireAuth && isAuthenticated) {
        router.push('/user/complaints');
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  useEffect(() => {
    const checkSessionActivity = () => {
      if (isAuthenticated && !tokenService.isSessionActive()) {
        console.log('Sessão inativa detectada, mas não redirecionando automaticamente');
      }
    };

    const interval = setInterval(checkSessionActivity, 60 * 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated, router]);

  if (isLoading && !isAuthenticated) {
    return (
      <Flex style={{
        height: '100vh',
        fontSize: '18px'
      }} vertical justify='center' align='center' gap={10}>
        <Spin />
        Carregando...
      </Flex> 
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
} 