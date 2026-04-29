/**
 * Конфигурация Redux Store
 * Объединяет все редьюсеры приложения
 */

import { configureStore } from '@reduxjs/toolkit'
import { themeReducer } from '@/features/theme'
import { baseApi } from '@/shared/api/baseApi'

/**
 * Redux Store
 * Централизованное хранилище состояния приложения
 */
export const store = configureStore({
  reducer: {
    /**
     * Редьюсер для управления темой приложения
     */
    theme: themeReducer,
    /**
     * Редьюсер RTK Query для API
     */
    [baseApi.reducerPath]: baseApi.reducer,
  },
  /**
   * Middleware включает RTK Query middleware для кэширования и запросов
   */
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
})

/**
 * RootState тип - для типизации селекторов
 */
export type RootState = ReturnType<typeof store.getState>

/**
 * AppDispatch тип - для типизации dispatch функции
 */
export type AppDispatch = typeof store.dispatch

