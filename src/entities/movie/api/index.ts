/**
 * Экспорт API для работы с фильмами
 */

export {
  movieApi,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetUpcomingMoviesQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useDiscoverMoviesQuery,
  useGetGenresQuery,
  useGetSimilarMoviesQuery,
} from './movieApi'
export { useMoviesByCategory, type CategoryType } from './useMoviesByCategory'
