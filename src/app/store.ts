// store.ts
/**
 * Конфигурация Redux Store с RTK.
 */
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/baseApi';
import { movieApi } from '@/entities/movie/api/movieApi';
import { actorApi } from '@/entities/actor/api/actorApi';
import { favoritesSlice } from '@/features/favorites/model/favoritesSlice';
import { themeSlice } from '@/features/theme/model/themeSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    favorites: favoritesSlice.reducer,
    theme: themeSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      movieApi.middleware,
      actorApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
