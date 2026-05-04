/**
 * Виджет MovieList
 * Отображает список фильмов в виде сетки
 */

import type { FC } from 'react'
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
 * @param movies массив фильмов
 * @returns React компонент MovieList
 */
const MovieList: FC<MovieListProps> = ({ movies }) => {
  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={{
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
          }}
        />
      ))}
    </div>
  )
}

export default MovieList

