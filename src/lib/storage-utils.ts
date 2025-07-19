class StorageUtils {
  private readonly PREFIX = 'app_';
  private readonly ENCRYPTION_KEY = 'your-secret-key';

  private getKey(key: string): string {
    return `${this.PREFIX}${key}`;
  }

  private encrypt(data: string): string {
    try {
      return btoa(encodeURIComponent(data));
    } catch {
      return data;
    }
  }

  private decrypt(data: string): string {
    try {
      return decodeURIComponent(atob(data));
    } catch {
      return data;
    }
  }

  setItem(key: string, value: string, encrypt: boolean = true): void {
    if (typeof window === 'undefined') return;

    const storageKey = this.getKey(key);
    const dataToStore = encrypt ? this.encrypt(value) : value;
    
    try {
      localStorage.setItem(storageKey, dataToStore);
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  }

  getItem(key: string, decrypt: boolean = true): string | null {
    if (typeof window === 'undefined') return null;

    const storageKey = this.getKey(key);
    
    try {
      const value = localStorage.getItem(storageKey);
      if (value === null) return null;
      
      return decrypt ? this.decrypt(value) : value;
    } catch (error) {
      console.error('Erro ao ler do localStorage:', error);
      return null;
    }
  }

  removeItem(key: string): void {
    if (typeof window === 'undefined') return;

    const storageKey = this.getKey(key);
    
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error('Erro ao remover do localStorage:', error);
    }
  }

  clear(): void {
    if (typeof window === 'undefined') return;

    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error);
    }
  }

  setSessionItem(key: string, value: string): void {
    if (typeof window === 'undefined') return;

    try {
      sessionStorage.setItem(key, value);
    } catch (error) {
      console.error('Erro ao salvar no sessionStorage:', error);
    }
  }

  getSessionItem(key: string): string | null {
    if (typeof window === 'undefined') return null;

    try {
      return sessionStorage.getItem(key);
    } catch (error) {
      console.error('Erro ao ler do sessionStorage:', error);
      return null;
    }
  }

  removeSessionItem(key: string): void {
    if (typeof window === 'undefined') return;

    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Erro ao remover do sessionStorage:', error);
    }
  }

  clearSession(): void {
    if (typeof window === 'undefined') return;

    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Erro ao limpar sessionStorage:', error);
    }
  }

  isStorageAvailable(): boolean {
    if (typeof window === 'undefined') return false;

    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  getStorageSize(): number {
    if (typeof window === 'undefined') return 0;

    try {
      let total = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
      return total;
    } catch {
      return 0;
    }
  }
}

export const storageUtils = new StorageUtils(); 