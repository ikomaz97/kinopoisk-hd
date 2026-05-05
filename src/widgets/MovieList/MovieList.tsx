/**
 * Виджет MovieList
 * Отображает список фильмов в виде сетки
 * Мемоизирован для оптимизации перерисовок
 */

import type { FC } from 'react'
import { useMemo, memo } from 'react'
import type { Movie } from '@/entities/movie'
import { MovieCard } from '@/entities/movie/ui'
import styles from './MovieList.module.css'

/**
 * Пропсы для компонента MovieList
 */
interface MovieListProps {
  /**
   * Массив фильмов для отображения
   */
  movies: Movie[]
}

/**
 * Виджет списка фильмов
 * Отображает фильмы в адаптивной сетке
 * Мемоизирован компонент и карточки для оптимизации производительности
 * @param movies массив фильмов
 * @returns React компонент MovieList
 */
const MovieList: FC<MovieListProps> = ({ movies }) => {
  // Мемоизируем карточки только если меняются сами фильмы
  const movieCards = useMemo(
    () =>
      movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={{
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
          }}
        />
      )),
    [movies]
  )

  return <div className={styles.movieList}>{movieCards}</div>
}

export default memo(MovieList)

