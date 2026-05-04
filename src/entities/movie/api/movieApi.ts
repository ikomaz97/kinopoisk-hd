/**
 * API для работы с фильмами
 * Использует RTK Query для запросов к TMDB API
 */

import { baseApi } from '@/shared/api/baseApi'
import type { MovieDetails, MovieSearchResult, MoviesWithPagination } from '../model'
import { MovieDetailsSchema, SearchSchema } from '../model/schemas'
import { DEFAULT_LANGUAGE, DEFAULT_REGION, TMDB_ACCESS_TOKEN } from '@/shared/constants/api'

/**
 * API для получения фильмов из TMDB
 */
export const movieApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Получить популярные фильмы
     * @param page номер страницы
     * @returns популярные фильмы с информацией о пагинации
     */
    getPopularMovies: builder.query<MoviesWithPagination, number | void>({ query: (page = 1) => ({
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
      return {
        movies: result.results,
        totalPages: result.total_pages,
        totalResults: result.total_results,
      }
    },
    }),

    /**
     * Получить лучшие фильмы
     * @param page номер страницы
     * @returns лучшие фильмы с информацией о пагинации
     */
    getTopRatedMovies: builder.query<MoviesWithPagination, number | void>({ query: (page = 1) => ({
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
      return {
        movies: result.results,
        totalPages: result.total_pages,
        totalResults: result.total_results,
      }
    },
    }),

    /**
     * Получить фильмы, которые сейчас в прокате
     * @param page номер страницы
     * @returns фильмы в прокате с информацией о пагинации
     */
    getNowPlayingMovies: builder.query<MoviesWithPagination, number | void>({ query: (page = 1) => ({
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
      return {
        movies: result.results,
        totalPages: result.total_pages,
        totalResults: result.total_results,
      }
    },
    }),

    /**
     * Получить предстоящие фильмы
     * @param page номер страницы
     * @returns предстоящие фильмы с информацией о пагинации
     */
    getUpcomingMovies: builder.query<MoviesWithPagination, number | void>({ query: (page = 1) => ({
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
      return {
        movies: result.results,
        totalPages: result.total_pages,
        totalResults: result.total_results,
      }
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

    /**
     * Получить фильмы с фильтрацией и сортировкой через discover API
     * Используется на странице фильтрации фильмов
     * @param параметры фильтрации и сортировки
     * @returns фильмы с информацией о пагинации
     */
    discoverMovies: builder.query<MoviesWithPagination, {
      genreIds: number[]
      minRating: number
      sortBy: string
      page: number
    }>({
      query: ({ genreIds, minRating, sortBy, page = 1 }) => ({
        url: '/discover/movie',
        params: {
          page,
          language: DEFAULT_LANGUAGE,
          region: DEFAULT_REGION,
          include_adult: false,
          include_video: false,
          'with_genres': genreIds.length > 0 ? genreIds.join('|') : undefined,
          'vote_average.gte': minRating > 0 ? minRating : undefined,
          sort_by: sortBy,
        },
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
      }),
      transformResponse: (response) => {
        const result = SearchSchema.parse(response)
        return {
          movies: result.results,
          totalPages: result.total_pages,
          totalResults: result.total_results,
        }
      },
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
  useDiscoverMoviesQuery,
} = movieApi
