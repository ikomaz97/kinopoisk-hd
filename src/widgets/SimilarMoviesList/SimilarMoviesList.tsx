/**
 * Виджет похожих фильмов
 * Отображает до 6 карточек похожих фильмов в горизонтальном ряду
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

  // Ограничиваем список 6 фильмами
  const limitedMovies = sortedMovies.slice(0, 6)

  // Если фильмов нет или они не найдены, показываем сообщение
  if (limitedMovies.length === 0) {
    return <p className={styles.noResults}>Похожие фильмы не найдены</p>
  }

  // Показываем ограниченный список похожих фильмов
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Похожие фильмы</h2>
      </div>
      <MovieList movies={limitedMovies} />
    </div>
  )
}

export default SimilarMoviesList
