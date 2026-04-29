// baseApi.ts
/**
 * Базовый API с RTK Query.
 * Настраивает базовый URL для всех API запросов.
 */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  tagTypes: [],
  endpoints: () => ({}),
});

export const { reducerPath, reducer, middleware } = baseApi;

