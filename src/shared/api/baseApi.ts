/**
 * Базовый API для TMDB
 * Настраивает RTK Query с токеном из .env
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TMDB_BASE_URL, TMDB_ACCESS_TOKEN } from '@/shared/constants/api'

/**
 * Базовый запрос, добавляющий заголовок авторизации
 */
const baseQuery = fetchBaseQuery({
  baseUrl: TMDB_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Bearer ${TMDB_ACCESS_TOKEN}`)
    headers.set('Content-Type', 'application/json;charset=utf-8')
    return headers
  },
})

/**
 * Базовый API, который будет расширяться в сущностях
 */
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
})

