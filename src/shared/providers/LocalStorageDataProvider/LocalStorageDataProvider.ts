import {StorageProvider} from './types';

export class LocalStorageDataProvider implements StorageProvider {
  /**
   * Sets a value in the local storage with the given key.
   * @param {string} key - The key to store the value with.
   * @param {any} value - The value to store.
   */
  setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error setting item in localStorage:', error);
    }
  }

  /**
   * Retrieves the value from the local storage associated with the given key.
   * @param {string} key - The key to retrieve the value for.
   * @returns {any | null} The value associated with the key, or null if the key is not found.
   */
  getItem(key: string): any | null {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error accessing local storage:', error);
      return null;
    }
  }

  /**
   * Removes the value from the local storage associated with the given key.
   * @param {string} key - The key to remove the value for.
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from localStorage:', error);
    }
  }

  /**
   * Clears all key-value pairs from the local storage.
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('An error occurred while clearing local storage:', error);
    }
  }
}
