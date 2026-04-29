/**
 * API для работы с фильмами
 * Использует RTK Query для запросов к TMDB API
 */

import { baseApi } from '@/shared/api/baseApi'
import type { Movie, MovieDetails, MovieSearchResult } from '../model/types'
import { MovieSchema, MovieDetailsSchema, SearchSchema } from '../model/schemas'
import { TMDB_BASE_URL, TMDB_ACCESS_TOKEN, DEFAULT_LANGUAGE, DEFAULT_REGION } from '@/shared/constants/api'

/**
 * API для получения фильмов из TMDB
 */
export const movieApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Получить популярные фильмы
     * @param page номер страницы
     * @returns популярные фильмы
     */
    getPopularMovies: builder.query<Movie[], number | void>({ query: (page = 1) => ({
      url: '/movie/popular',
      params: {
        page,
        language: DEFAULT_LANGUAGE,
        region: DEFAULT_REGION,
      },
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      },
    }),
    transformResponse: (response) => {
      const result = SearchSchema.parse(response)
      return result.results
    },
    }),

    /**
     * Получить лучшие фильмы
     * @param page номер страницы
     * @returns лучшие фильмы
     */
    getTopRatedMovies: builder.query<Movie[], number | void>({ query: (page = 1) => ({
      url: '/movie/top_rated',
      params: {
        page,
        language: DEFAULT_LANGUAGE,
        region: DEFAULT_REGION,
      },
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      },
    }),
    transformResponse: (response) => {
      const result = SearchSchema.parse(response)
      return result.results
    },
    }),

    /**
     * Получить фильмы, которые сейчас в прокате
     * @param page номер страницы
     * @returns фильмы в прокате
     */
    getNowPlayingMovies: builder.query<Movie[], number | void>({ query: (page = 1) => ({
      url: '/movie/now_playing',
      params: {
        page,
        language: DEFAULT_LANGUAGE,
        region: DEFAULT_REGION,
      },
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      },
    }),
    transformResponse: (response) => {
      const result = SearchSchema.parse(response)
      return result.results
    },
    }),

    /**
     * Получить предстоящие фильмы
     * @param page номер страницы
     * @returns предстоящие фильмы
     */
    getUpcomingMovies: builder.query<Movie[], number | void>({ query: (page = 1) => ({
      url: '/movie/upcoming',
      params: {
        page,
        language: DEFAULT_LANGUAGE,
        region: DEFAULT_REGION,
      },
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      },
    }),
    transformResponse: (response) => {
      const result = SearchSchema.parse(response)
      return result.results
    },
    }),

    /**
     * Поиск фильмов по названию
     * @param query строка поиска
     * @param page номер страницы
     * @returns результаты поиска
     */
    searchMovies: builder.query<MovieSearchResult, { query: string; page?: number }>({ query: ({ query, page = 1 }) => ({
      url: '/search/movie',
      params: {
        query,
        page,
        language: DEFAULT_LANGUAGE,
        region: DEFAULT_REGION,
      },
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      },
    }),
    transformResponse: (response) => SearchSchema.parse(response),
    }),

    /**
     * Получить детали фильма по ID
     * @param id ID фильма
     * @returns детали фильма
     */
    getMovieDetails: builder.query<MovieDetails, number>({ query: (id) => ({
      url: `/movie/${id}`,
      params: {
        language: DEFAULT_LANGUAGE,
        append_to_response: 'videos,credits',
      },
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      },
    }),
    transformResponse: (response) => MovieDetailsSchema.parse(response),
    }),
  }),
})

export const {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetUpcomingMoviesQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
} = movieApi
