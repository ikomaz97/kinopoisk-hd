/**
 * Виджет MovieList
 * Отображает список фильмов в виде сетки
 */

import type { FC } from 'react'
import type { Movie } from '@/entities/movie'
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
        <div key={movie.id} className={styles.movieCard}>
          <img
            src={movie.poster_path
              ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
              : 'https://placehold.co/300x450?text=No+Poster'
            }
            alt={movie.title}
            className={styles.poster}
          />
          <h3 className={styles.title}>{movie.title}</h3>
          <p className={styles.releaseDate}>
            {new Date(movie.release_date).getFullYear()}
          </p>
          <span className={styles.rating}>
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  )
}

export default MovieList

