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

  // ПРАВИЛЬНО: показываем не более 6 фильмов или все если их меньше
  // Math.min гарантирует, что мы не выйдем за пределы массива
  const moviesToShow = similarMovies.results.slice(0, Math.min(6, similarMovies.results.length))

  return (
    <div className={styles.container}>
      <MovieList movies={moviesToShow} />
    </div>
  )
}

export default SimilarMoviesList

