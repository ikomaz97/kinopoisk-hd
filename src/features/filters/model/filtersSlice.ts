/**
 * Redux слайс для управления состоянием фильтров и сортировки фильмов
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { SortByValue } from './types'
import { INITIAL_FILTERS_STATE } from './types'

/**
 * Слайс фильтров
 */
export const filtersSlice = createSlice({
  name: 'filters',
  initialState: INITIAL_FILTERS_STATE,

  reducers: {
    /**
     * Переключить жанр в выборе (добавить или удалить)
     */
    toggleGenre: (state, action: PayloadAction<number>) => {
      const genreId = action.payload

      if (state.genreIds.includes(genreId)) {
        state.genreIds = state.genreIds.filter((id) => id !== genreId)
      } else {
        state.genreIds.push(genreId)
      }

      // Вернуться на первую страницу при изменении фильтра
      state.page = 1
    },

    /**
     * Установить минимальный рейтинг
     */
    setMinRating: (state, action: PayloadAction<number>) => {
      state.minRating = action.payload
      // Вернуться на первую страницу при изменении фильтра
      state.page = 1
    },

    /**
     * Установить максимальный рейтинг
     */
    setMaxRating: (state, action: PayloadAction<number>) => {
      state.maxRating = action.payload
      // Вернуться на первую страницу при изменении фильтра
      state.page = 1
    },

    /**
     * Установить диапазон рейтинга
     */
    setRatingRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.minRating = action.payload.min
      state.maxRating = action.payload.max
      // Вернуться на первую страницу при изменении фильтра
      state.page = 1
    },

    /**
     * Установить параметр сортировки
     */
    setSortBy: (state, action: PayloadAction<SortByValue>) => {
      state.sortBy = action.payload
      // Вернуться на первую страницу при изменении сортировки
      state.page = 1
    },

    /**
     * Установить текущую страницу
     */
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },

    /**
     * Сбросить все фильтры на их дефолтные значения
     */
    resetFilters: (state) => {
      state.genreIds = INITIAL_FILTERS_STATE.genreIds
      state.minRating = INITIAL_FILTERS_STATE.minRating
      state.maxRating = INITIAL_FILTERS_STATE.maxRating
      state.sortBy = INITIAL_FILTERS_STATE.sortBy
      state.page = INITIAL_FILTERS_STATE.page
    },
  },
})

export const { toggleGenre, setMinRating, setMaxRating, setRatingRange, setSortBy, setPage, resetFilters } =
  filtersSlice.actions
export default filtersSlice.reducer
