import { useEffect, useCallback } from 'react';
import { useAuth } from './use-auth';
import { tokenService } from '../services/token-service';

export function useSessionPersistence() {
  const { isAuthenticated, refreshAuth } = useAuth();

  const checkSessionValidity = useCallback(async () => {
    if (!isAuthenticated) return;

    const tokenData = tokenService.getTokenData();
    if (!tokenData) {
      return;
    }

    const now = Date.now();
    const timeUntilExpiry = tokenData.expiresAt - now;
    const refreshThreshold = 30 * 60 * 1000;

    if (timeUntilExpiry <= refreshThreshold) {
      await refreshAuth();
    }
  }, [isAuthenticated, refreshAuth]);

  const setupSessionMonitoring = useCallback(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(checkSessionValidity, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated, checkSessionValidity]);

  useEffect(() => {
    const cleanup = setupSessionMonitoring();
    return cleanup;
  }, [setupSessionMonitoring]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isAuthenticated) {
        tokenService.updateLastActivity();
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && isAuthenticated) {
        tokenService.updateLastActivity();
        checkSessionValidity();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAuthenticated, checkSessionValidity]);

  return {
    checkSessionValidity,
    isSessionValid: isAuthenticated && tokenService.isSessionActive(),
  };
} 