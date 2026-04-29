/**
 * Redux слайс для управления темой приложения
 * Содержит логику переключения между темной и светлой темами
 */

import { createSlice } from '@reduxjs/toolkit'

/**
 * Тип темы: 'light' (светлая) или 'dark' (темная)
 */
export type ThemeMode = 'light' | 'dark'

/**
 * Состояние ��емы
 */
interface ThemeState {
  mode: ThemeMode
}

/**
 * Начальное состояние - используем localStorage или устанавливаем 'dark' по умолчанию
 */
const initialState: ThemeState = {
  mode: (localStorage.getItem('theme') as ThemeMode) || 'dark',
}

/**
 * Redux слайс для темы
 */
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    /**
     * Переключить тему (light <-> dark)
     * @param state текущее состояние
     */
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', state.mode)
    },

    /**
     * Установить конкретную тему
     * @param state текущее состояние
     * @param action действие с payload - режим темы
     */
    setTheme: (state, action: { payload: ThemeMode }) => {
      state.mode = action.payload
      localStorage.setItem('theme', state.mode)
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer

