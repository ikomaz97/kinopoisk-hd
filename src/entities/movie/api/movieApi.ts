// movieApi.ts
/**
 * API эндпоинты для работы с фильмами.
 */
import { MovieSchema } from '@/entities/movie/model/schemas';
import { z } from 'zod';
import { baseApi } from '@/shared/api/baseApi';

export const movieApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    /**
     * Поиск фильмов по запросу.
     * Страница 1, 20 результатов.
     */
    searchMovies: builder.query<any, string>({
      query: (query: string) => `search/movie?query=${encodeURIComponent(query)}`,
      transformResponse: (response: any) => {
        // Валидация через Zod
        const schema = z.object({
          results: z.array(MovieSchema),
        });
        const parsed = schema.safeParse(response);
        if (!parsed.success) {
          console.error('Ошибка валидации данных фильма');
          return { results: [] };
        }
        return parsed.data;
      },
    }),
    /**
     * Получить детали фильма по ID.
     */
    getMovieById: builder.query<any, string>({
      query: (id: string) => `movie/${id}`,
      transformResponse: (response: any) => {
        const parsed = MovieSchema.safeParse(response);
        if (!parsed.success) {
          console.error('Ошибка валидации деталей фильма');
          return {};
        }
        return parsed.data;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useSearchMoviesQuery, useLazySearchMoviesQuery, useGetMovieByIdQuery } = movieApi;
