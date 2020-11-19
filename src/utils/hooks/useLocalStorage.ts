import { useState } from 'react';

export const useLocalStore = (key: string, initialValue: any) => {
  const [storedValue, setValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  const setsessionStorage = (value: any) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    } catch (e) {
      console.error(e);
    }
  };

  return [storedValue, setsessionStorage];
};
