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
  currentPage: number
  itemsPerPage: number
  isLoading: boolean
  error: string | null
}

/**
 * Начальное состояние
 */
const initialState: FavoritesState = {
  items: getFavorites(),
  currentPage: 1,
  itemsPerPage: 20,
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

    /**
     * Установить текущую страницу для пагинации
     */
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
})

export const { addToFavorites, removeFromFavorites, clearFavorites, setCurrentPage } = favoritesSlice.actions
export default favoritesSlice.reducer
