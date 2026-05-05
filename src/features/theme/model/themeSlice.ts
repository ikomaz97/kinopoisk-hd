/**
 * Redis слайс для управления темой приложения
 * Содержит логику переключения между темной и светлой темами
 */

import { createSlice } from '@reduxjs/toolkit'

/**
 * Тип темы: 'light' (светлая) или 'dark' (темная)
 */
export type ThemeMode = 'light' | 'dark'

/**
 * Состояние темы
 */
interface ThemeState {
  mode: ThemeMode
}

/**
 * Безопасно получает тему из localStorage
 * Учитывает SSR и недоступность localStorage в приватных окнах
 * @returns 'light' | 'dark' или 'dark' по умолчанию
 */
const getInitialTheme = (): ThemeMode => {
  // Проверяем наличие localStorage (важно для SSR/hydration)
  if (typeof window === 'undefined') {
    return 'dark'
  }

  try {
    const stored = localStorage.getItem('theme')
    // Валидируем, что это реально 'light' или 'dark'
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
  } catch (error) {
    // Игнорируем ошибки доступа к localStorage
    // Может быть в приватных окнах браузера или при отключённых cookies
    if (error instanceof Error) {
      console.error('Ошибка доступа к localStorage при загрузке темы:', error.message)
    }
  }

  // Возвращаем дефолт
  return 'dark'
}

/**
 * Начальное состояние - используем localStorage или устанавливаем 'dark' по умолчанию
 */
const initialState: ThemeState = {
  mode: getInitialTheme(),
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
      try {
        localStorage.setItem('theme', state.mode)
      } catch (error) {
        // Ошибка сохранения не должна сломать приложение
        if (error instanceof Error) {
          console.error('Ошибка сохранения темы в localStorage:', error.message)
        }
      }
    },

    /**
     * Установить конкретную тему
     * @param state текущее состояние
     * @param action действие с payload - режим темы
     */
    setTheme: (state, action: { payload: ThemeMode }) => {
      state.mode = action.payload
      try {
        localStorage.setItem('theme', state.mode)
      } catch (error) {
        // Ошибка сохранения не должна сломать приложение
        if (error instanceof Error) {
          console.error('Ошибка сохранения темы в localStorage:', error.message)
        }
      }
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer

