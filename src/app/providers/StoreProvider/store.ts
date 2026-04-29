/**
 * Конфигурация Redux Store
 * Объединяет все редьюсеры приложения
 */

import { configureStore } from '@reduxjs/toolkit'
import { themeReducer } from '@/features/theme'

/**
 * Redux Store
 * Централизованное хранилище состояния приложения
 */
export const store = configureStore({
  reducer: {
    /**
     * Редьюсер д��я управления темой приложения
     */
    theme: themeReducer,
  },
})

/**
 * RootState тип - для типизации селекторов
 */
export type RootState = ReturnType<typeof store.getState>

/**
 * AppDispatch тип - для типизации dispatch функции
 */
export type AppDispatch = typeof store.dispatch

