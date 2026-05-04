/**
 * Zod‑схемы для валидации ответов TMDB API
 */

import { z } from 'zod'

/**
 * Общая схема фильма (используется в списках)
 */
export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string(),
  vote_average: z.number(),
  popularity: z.number(),
  genre_ids: z.array(z.number()).optional(),
})

/**
 * Схема результата поиска (страничный ответ)
 */
export const SearchSchema = z.object({
  page: z.number(),
  total_results: z.number(),
  total_pages: z.number(),
  results: z.array(MovieSchema),
})

/**
 * Схема жанра
 */
export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
})

/**
 * Схема ответа со списком жанров
 */
export const GenreListSchema = z.object({
  genres: z.array(GenreSchema),
})

/**
 * Схема деталей фильма
 */
export const MovieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  runtime: z.number(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
  production_companies: z.array(z.object({ id: z.number(), name: z.string() })),
  production_countries: z.array(z.object({ iso_3166_1: z.string(), name: z.string() })),
  spoken_languages: z.array(z.object({ iso_639_1: z.string(), name: z.string() })),
  credits: z.object({
    cast: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        character: z.string(),
        profile_path: z.string().nullable(),
      })
    ),
    crew: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        job: z.string(),
        profile_path: z.string().nullable(),
      })
    ),
  }),
  videos: z.object({
    results: z.array(
      z.object({
        id: z.string(),
        key: z.string(),
        site: z.string(),
        type: z.string(),
        name: z.string(),
      })
    ),
  }),
})

