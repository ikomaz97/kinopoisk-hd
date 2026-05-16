/**
 * Виджет MovieList
 * Отображает список фильмов в виде сетки (по умолчанию)
 * или в горизонтальном ряду (при horizontal=true)
 * Мемоизирован для оптимизации перерисовок
 */

import type { FC } from 'react'
import { memo } from 'react'
import type { Movie } from '@/entities/movie'
import { MovieCard } from '@/entities/movie/ui'
import styles from './MovieList.module.css'

/**
 * Пропсы для компонента MovieList
 */
interface MovieListProps {
  /** Массив фильмов для отображения */
  movies: Movie[]
  /** Горизонтальный ряд без переноса (для похожих фильмов и т.п.) */
  horizontal?: boolean
}

/**
 * Виджет списка фильмов
 * Отображает фильмы в адаптивной сетке или горизонтальном ряду
 * @param movies массив фильмов
 * @param horizontal флаг горизонтального отображения
 * @returns React компонент MovieList
 */
const MovieList: FC<MovieListProps> = ({ movies, horizontal = false }) => {
  const className = horizontal
    ? `${styles.movieList} ${styles.movieListHorizontal}`
    : styles.movieList

  return <div className={className}>
    {movies.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
      />
    ))}
  </div>
}

export default memo(MovieList)
