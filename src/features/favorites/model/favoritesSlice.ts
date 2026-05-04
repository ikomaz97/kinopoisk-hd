/**
 * Слайс избранного
 * Управляет списком избранных фильмов в localStorage
 */

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getFavorites, saveFavorites } from '@/shared/lib/storage'

/**
 * Интерфейс избранного фильма
 */
interface FavoriteMovie {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
}

/**
 * Состояние слайса избранного
 */
interface FavoritesState {
  items: FavoriteMovie[]
  isLoading: boolean
  error: string | null
}

/**
 * Начальное состояние
 */
const initialState: FavoritesState = {
  items: getFavorites(),
  isLoading: false,
  error: null,
}

/**
 * Слайс избранного
 */
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    /**
     * Добавить фильм в избранное
     */
    addToFavorites: (state, action: PayloadAction<FavoriteMovie>) => {
      if (!state.items.find((item) => item.id === action.payload.id)) {
        state.items.push(action.payload)
        saveFavorites(state.items)
      }
    },

    /**
     * Удалить фильм из избранного
     */
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      saveFavorites(state.items)
    },

    /**
     * Очистить всё избранное
     */
    clearFavorites: (state) => {
      state.items = []
      saveFavorites([])
    },
  },
})

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
