class LocalStorageService {
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = typeof value === 'object'
        ? JSON.stringify(value)
        : String(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving to localStorage [${key}]`, error);
    }
  }
  
  getItem<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(key);
      if (value === null) return null;
  
      // Try parsing only if it looks like JSON
      if (value.startsWith('{') || value.startsWith('[')) {
        return JSON.parse(value) as T;
      }
  
      return value as unknown as T;
    } catch (error) {
      console.error(`Error reading from localStorage [${key}]`, error);
      return null;
    }
  }
  
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage [${key}]`, error);
    }
  }
  
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  }
}
  
export const localStorageService = new LocalStorageService();
  