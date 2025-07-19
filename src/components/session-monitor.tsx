import { useEffect, useRef } from 'react';
import { useAuth } from '../hooks/use-auth';
import { tokenService } from '../services/token-service';

export function SessionMonitor() {
  const { isAuthenticated, refreshAuth } = useAuth();
  const activityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetActivityTimeout = () => {
    if (activityTimeoutRef.current) {
      clearTimeout(activityTimeoutRef.current);
    }

    if (isAuthenticated) {
      activityTimeoutRef.current = setTimeout(() => {
        tokenService.updateLastActivity();
      }, 10 * 60 * 1000);
    }
  };

  const setupRefreshToken = () => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    if (isAuthenticated) {
      const checkAndRefresh = async () => {
        try {
          if (tokenService.shouldRefreshToken()) {
            await refreshAuth();
          }
        } catch (error) {
          console.error('Erro na renovação automática:', error);
        }
        setupRefreshToken();
      };

      refreshTimeoutRef.current = setTimeout(checkAndRefresh, 5 * 60 * 1000);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      resetActivityTimeout();
      setupRefreshToken();

      const handleUserActivity = () => {
        tokenService.updateLastActivity();
        resetActivityTimeout();
      };

      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
      
      events.forEach(event => {
        document.addEventListener(event, handleUserActivity, true);
      });

      return () => {
        events.forEach(event => {
          document.removeEventListener(event, handleUserActivity, true);
        });
        
        if (activityTimeoutRef.current) {
          clearTimeout(activityTimeoutRef.current);
        }
        if (refreshTimeoutRef.current) {
          clearTimeout(refreshTimeoutRef.current);
        }
      };
    }
  }, [isAuthenticated, refreshAuth]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isAuthenticated) {
        tokenService.updateLastActivity();
        if (tokenService.shouldRefreshToken()) {
          refreshAuth().catch(error => {
            console.error('Erro ao renovar token na mudança de visibilidade:', error);
          });
        }
      }
    };

    const handleBeforeUnload = () => {
      if (isAuthenticated) {
        tokenService.updateLastActivity();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAuthenticated, refreshAuth]);

  return null;
} 