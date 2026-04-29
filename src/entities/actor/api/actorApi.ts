// actorApi.ts
/**
 * ВРЕМЕННО: API для актёров (заглушка).
 * TODO: Реализовать полноценные эндпоинты для работы с актёрами.
 */
import { baseApi } from '@/shared/api/baseApi';

export const actorApi = baseApi.injectEndpoints({
  endpoints: () => ({}),
  overrideExisting: false,
});

export const { reducerPath: actorReducerPath, reducer: actorReducer } = actorApi;

