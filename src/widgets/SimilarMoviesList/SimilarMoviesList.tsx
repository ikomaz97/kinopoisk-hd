/**
 * Виджет похожих фильмов
 * Отображает минимум 6 карточек похожих фильмов
 */

import type { FC } from 'react'
import { useGetSimilarMoviesQuery } from '@/entities/movie/api'
import { MovieList } from '@/widgets/MovieList'
import { Loader } from '@/shared/ui/Loader'
import styles from './SimilarMoviesList.module.css'

/**
 * Виджет похожих фильмов
 * @param movieId ID фильма
 * @returns React компонент
 */
const SimilarMoviesList: FC<{ movieId: number }> = ({ movieId }) => {
  const { data: similarMovies, isLoading, error } = useGetSimilarMoviesQuery(movieId)

  if (isLoading) {
    return <Loader />
  }

  if (error || !similarMovies || similarMovies.results.length === 0) {
    return <p className={styles.noResults}>Похожие фильмы не найдены</p>
  }

  // Отображаем минимум 6 фильмов
  const moviesToShow = similarMovies.results.slice(0, Math.max(6, similarMovies.results.length))

  return (
    <div className={styles.container}>
      <MovieList movies={moviesToShow} />
    </div>
  )
}

export default SimilarMoviesList

