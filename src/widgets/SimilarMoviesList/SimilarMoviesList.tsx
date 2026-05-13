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

  // Сортируем фильмы по рейтингу (по убыванию)
  const sortedMovies = [...similarMovies.results].sort((a, b) => b.vote_average - a.vote_average)

  // Показываем все доступные похожие фильмы
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Похожие фильмы</h2>
        <span className={styles.countBadge}>Найдено: {similarMovies.results.length}</span>
      </div>
      <MovieList movies={sortedMovies} />
    </div>
  )
}

export default SimilarMoviesList
