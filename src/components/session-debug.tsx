import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { tokenService } from '../services/token-service';

export function SessionDebug() {
  // Componente desabilitado - retorna null sempre
  return null;

  const { isAuthenticated, user } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const updateDebugInfo = () => {
      const tokenData = tokenService.getTokenData();
      const timeUntilExpiry = tokenService.getTimeUntilExpiry();
      const lastActivity = tokenService.getLastActivity();
      const isSessionActive = tokenService.isSessionActive();
      const shouldRefresh = tokenService.shouldRefreshToken();

      setDebugInfo({
        isAuthenticated,
        hasToken: !!tokenData?.token,
        hasRefreshToken: !!tokenData?.refreshToken,
        timeUntilExpiry: Math.floor(timeUntilExpiry / 1000 / 60), 
        lastActivity: Math.floor((Date.now() - lastActivity) / 1000 / 60),
        isSessionActive,
        shouldRefresh,
        user: user?.name || 'N/A'
      });
    };

    updateDebugInfo();
    const interval = setInterval(updateDebugInfo, 5000);

    return () => clearInterval(interval);
  }, [isAuthenticated, user]);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '12px',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Session Debug</div>
      <div>Auth: {debugInfo.isAuthenticated ? '✅' : '❌'}</div>
      <div>Token: {debugInfo.hasToken ? '✅' : '❌'}</div>
      <div>Refresh: {debugInfo.hasRefreshToken ? '✅' : '❌'}</div>
      <div>Expiry: {debugInfo.timeUntilExpiry}m</div>
      <div>Activity: {debugInfo.lastActivity}m ago</div>
      <div>Session: {debugInfo.isSessionActive ? '✅' : '❌'}</div>
      <div>Should Refresh: {debugInfo.shouldRefresh ? '✅' : '❌'}</div>
      <div>User: {debugInfo.user}</div>
    </div>
  );
} 