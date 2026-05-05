/**
 * Хук для загрузки фильмов выбранной категории
 * Загружает только нужную категорию, вместо всех сразу (оптимизация)
 *
 * ВАЖНО: вызывает ВСЕ хуки но использует skip для условного запроса
 * (нельзя вызывать хуки условно в React!)
 */

import {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetUpcomingMoviesQuery,
} from './movieApi'

/**
 * Тип категории фильма
 */
export type CategoryType = 'popular' | 'top_rated' | 'now_playing' | 'upcoming'

/**
 * Хук для загрузки фильмов выбранной категории
 * Динамически выбирает нужный RTK Query хук вместо загрузки всех категорий
 * @param category тип категории (popular, top_rated, now_playing, upcoming)
 * @param page номер страницы для пагинации
 * @returns результаты запроса RTK Query (data, isLoading, isFetching, error)
 */
export const useMoviesByCategory = (category: CategoryType, page: number) => {
  // Вызываем ВСЕ хуки (правило React: хуки должны быть в одинаковом порядке)
  // но используем skip параметр, чтобы выполнять запрос только для нужной категории
  const popularResult = useGetPopularMoviesQuery(page, { skip: category !== 'popular' })
  const topRatedResult = useGetTopRatedMoviesQuery(page, { skip: category !== 'top_rated' })
  const nowPlayingResult = useGetNowPlayingMoviesQuery(page, { skip: category !== 'now_playing' })
  const upcomingResult = useGetUpcomingMoviesQuery(page, { skip: category !== 'upcoming' })

  // Возвращаем результат для активной категории
  switch (category) {
    case 'popular':
      return popularResult
    case 'top_rated':
      return topRatedResult
    case 'now_playing':
      return nowPlayingResult
    case 'upcoming':
      return upcomingResult
  }
}


