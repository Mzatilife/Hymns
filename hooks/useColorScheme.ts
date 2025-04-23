import { useColorScheme as _useColorScheme } from 'react-native';
import { create } from 'zustand';

interface ColorSchemeStore {
  userPreference: 'light' | 'dark' | 'system';
  setUserPreference: (preference: 'light' | 'dark' | 'system') => void;
}

const useColorSchemeStore = create<ColorSchemeStore>((set) => ({
  userPreference: 'system',
  setUserPreference: (preference) => set({ userPreference: preference }),
}));

export function useColorScheme() {
  const systemColorScheme = _useColorScheme();
  const { userPreference } = useColorSchemeStore();

  if (userPreference === 'system') {
    return systemColorScheme;
  }

  return userPreference;
}

export function useColorSchemePreference() {
  return {
    userPreference: useColorSchemeStore((state) => state.userPreference),
    setUserPreference: useColorSchemeStore((state) => state.setUserPreference),
  };
}