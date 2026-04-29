// themeSlice.ts
/**
 * Слайс темы (light/dark) с синхронизацией в localStorage.
 */
import { createSlice } from '@reduxjs/toolkit';
import { loadFromStorage, saveToStorage } from '@/shared/lib/storage';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: loadFromStorage<ThemeMode>('theme') ?? 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      saveToStorage('theme', state.mode);
    },
    setTheme(state, action: { payload: ThemeMode }) {
      state.mode = action.payload;
      saveToStorage('theme', state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;

