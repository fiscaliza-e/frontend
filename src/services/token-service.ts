import { storageUtils } from '../lib/storage-utils';

interface TokenData {
  token: string;
  refreshToken: string;
  expiresAt: number;
}

class TokenService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly TOKEN_EXPIRY_KEY = 'token_expiry';
  private readonly REFRESH_THRESHOLD = 60 * 60 * 1000;
  private readonly DEFAULT_TOKEN_EXPIRY = 30 * 24 * 60 * 60;

  setTokens(token: string, refreshToken: string, expiresIn: number = this.DEFAULT_TOKEN_EXPIRY): void {
    if (typeof window === 'undefined') return;

    const expiresAt = Date.now() + (expiresIn * 1000);
    
    storageUtils.setItem(this.TOKEN_KEY, token);
    storageUtils.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    storageUtils.setItem(this.TOKEN_EXPIRY_KEY, expiresAt.toString());
    
    storageUtils.setSessionItem('last_activity', Date.now().toString());
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return storageUtils.getItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return storageUtils.getItem(this.REFRESH_TOKEN_KEY);
  }

  isTokenExpired(): boolean {
    if (typeof window === 'undefined') return true;
    
    const expiry = storageUtils.getItem(this.TOKEN_EXPIRY_KEY);
    if (!expiry) return true;

    const expiresAt = parseInt(expiry);
    return Date.now() >= expiresAt;
  }

  shouldRefreshToken(): boolean {
    if (typeof window === 'undefined') return false;
    
    const expiry = storageUtils.getItem(this.TOKEN_EXPIRY_KEY);
    if (!expiry) return false;

    const expiresAt = parseInt(expiry);
    const timeUntilExpiry = expiresAt - Date.now();
    
    return timeUntilExpiry <= this.REFRESH_THRESHOLD;
  }

  clearTokens(): void {
    if (typeof window === 'undefined') return;
    
    storageUtils.removeItem(this.TOKEN_KEY);
    storageUtils.removeItem(this.REFRESH_TOKEN_KEY);
    storageUtils.removeItem(this.TOKEN_EXPIRY_KEY);
    storageUtils.removeSessionItem('last_activity');
  }

  hasValidToken(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired();
  }

  getTokenData(): TokenData | null {
    const token = this.getToken();
    const refreshToken = this.getRefreshToken();
    const expiry = storageUtils.getItem(this.TOKEN_EXPIRY_KEY);

    if (!token || !refreshToken || !expiry) {
      return null;
    }

    return {
      token,
      refreshToken,
      expiresAt: parseInt(expiry)
    };
  }

  updateLastActivity(): void {
    if (typeof window === 'undefined') return;
    storageUtils.setSessionItem('last_activity', Date.now().toString());
  }

  getLastActivity(): number {
    if (typeof window === 'undefined') return 0;
    const lastActivity = storageUtils.getSessionItem('last_activity');
    return lastActivity ? parseInt(lastActivity) : 0;
  }

  isSessionActive(): boolean {
    const lastActivity = this.getLastActivity();
    const sessionTimeout = 7 * 24 * 60 * 60 * 1000;
    return Date.now() - lastActivity < sessionTimeout;
  }

  getTokenExpiryTime(): number | null {
    const expiry = storageUtils.getItem(this.TOKEN_EXPIRY_KEY);
    return expiry ? parseInt(expiry) : null;
  }

  getTimeUntilExpiry(): number {
    const expiry = this.getTokenExpiryTime();
    if (!expiry) return 0;
    return Math.max(0, expiry - Date.now());
  }
}

export const tokenService = new TokenService(); 