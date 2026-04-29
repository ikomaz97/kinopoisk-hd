/**
 * Хук для работы с темой приложения
 * Предоставляет текущий режим темы и функцию для переключения
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../model/themeSlice'
import type { ThemeMode } from '../model/themeSlice'
import type { RootState } from '@/app/providers/StoreProvider'

/**
 * Интерфейс возвращаемого значения хука
 */
interface UseThemeReturn {
  /**
   * Текущий режим темы
   */
  theme: ThemeMode
  /**
   * Функция для переключения темы
   */
  toggleTheme: () => void
  /**
   * Проверка - темная ли текущая тема
   */
  isDark: boolean
}

/**
 * Хук для работы с темой приложения
 * @returns объект с текущей темой и функцией переключения
 */
export const useTheme = (): UseThemeReturn => {
  const dispatch = useDispatch()

  // Получение текущего режима темы из Redux store
  const theme = useSelector((state: RootState) => state.theme.mode) as ThemeMode

  /**
   * Обработчик переключения темы
   */
  const handleToggleTheme = useCallback(() => {
    dispatch(toggleTheme())
  }, [dispatch])

  return {
    theme,
    toggleTheme: handleToggleTheme,
    isDark: theme === 'dark',
  }
}


