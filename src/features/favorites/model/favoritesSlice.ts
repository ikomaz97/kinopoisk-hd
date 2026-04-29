// favoritesSlice.ts
/**
 * Слайс избранного фильмов.
 * Синхронизирует состояние с localStorage.
 */
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { loadFromStorage, saveToStorage } from '@/shared/lib/storage';

export interface FavoritesState {
  ids: number[];
}

const initialState: FavoritesState = {
  ids: loadFromStorage<number[]>('favorites') ?? [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<number>) {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
        saveToStorage('favorites', state.ids);
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.ids = state.ids.filter(id => id !== action.payload);
      saveToStorage('favorites', state.ids);
    },
    setFavorites(state, action: PayloadAction<number[]>) {
      state.ids = action.payload;
      saveToStorage('favorites', state.ids);
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;
export const selectFavoriteIds = (state: RootState) => state.favorites.ids;
export default favoritesSlice.reducer;
