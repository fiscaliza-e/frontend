import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/use-auth';
import { tokenService } from '../services/token-service';

interface SessionNotificationProps {
  showWarning?: boolean;
  warningThreshold?: number;
}

export function SessionNotification({ 
  showWarning = true, 
  warningThreshold = 30 * 60 * 1000 
}: SessionNotificationProps) {
  const { isAuthenticated, refreshAuth } = useAuth();
  const [showNotification, setShowNotification] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!isAuthenticated || !showWarning) return;

    const checkTokenExpiry = () => {
      const timeUntilExpiry = tokenService.getTimeUntilExpiry();
      
      if (timeUntilExpiry <= warningThreshold && timeUntilExpiry > 0) {
        setTimeLeft(timeUntilExpiry);
        setShowNotification(true);
      } else {
        setShowNotification(false);
      }
    };

    const interval = setInterval(checkTokenExpiry, 1000);
    checkTokenExpiry();

    return () => clearInterval(interval);
  }, [isAuthenticated, showWarning, warningThreshold]);

  const handleRefresh = async () => {
    try {
      await refreshAuth();
      setShowNotification(false);
    } catch (error) {
      console.error('Erro ao renovar sessão:', error);
    }
  };

  const handleDismiss = () => {
    setShowNotification(false);
  };

  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!showNotification) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#fff3cd',
      border: '1px solid #ffeaa7',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      maxWidth: '300px',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '8px'
      }}>
        <h4 style={{
          margin: '0',
          color: '#856404',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          Sessão expirando
        </h4>
        <button
          onClick={handleDismiss}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#856404',
            padding: '0',
            marginLeft: '8px'
          }}
        >
          ×
        </button>
      </div>
      
      <p style={{
        margin: '0 0 12px 0',
        color: '#856404',
        fontSize: '13px',
        lineHeight: '1.4'
      }}>
        Sua sessão expirará em <strong>{formatTime(timeLeft)}</strong>. 
        Para continuar usando o sistema, clique em "Renovar Sessão".
      </p>
      
      <div style={{
        display: 'flex',
        gap: '8px'
      }}>
        <button
          onClick={handleRefresh}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
            fontSize: '12px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Renovar Sessão
        </button>
        
        <button
          onClick={handleDismiss}
          style={{
            backgroundColor: 'transparent',
            color: '#856404',
            border: '1px solid #856404',
            borderRadius: '4px',
            padding: '8px 16px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          Agora não
        </button>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
} 