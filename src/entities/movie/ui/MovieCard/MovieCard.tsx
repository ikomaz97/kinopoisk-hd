/**
 * Карточка фильма
 * Отображает постер, название, рейтинг и кнопку избранного
 * При клике на постер перенаправляет на страницу деталей фильма
 * Сердечко видно при наведении на карточку и добавляет в избранное без перехода
 */

import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { getPosterUrl } from '@/shared/lib/image'
import { FavoriteButton } from '@/features/favorites/ui'
import { memo } from 'react'
import styles from './MovieCard.module.css'

/**
 * Пропсы для компонента MovieCard
 */
export interface MovieCardProps {
  /**
   * Данные фильма
   */
  movie: {
    id: number
    title: string
    poster_path: string | null
    vote_average: number
  }
}

/**
 * Карточка фильма
 * @param movie данные фильма
 * @returns React компонент MovieCard
 */
const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  // Определение цвета рейтинга
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return '#00c853' // зеленый
    if (rating >= 6) return '#ffd600' // желтый
    return '#ff5252' // красный
  }

  const ratingColor = getRatingColor(movie.vote_average)

  return (
    <div className={styles.card}>
      {/* Контейнер постера с рейтингом и сердечком */}
      <div className={styles.posterContainer}>
        <Link to={`/movie/${movie.id}`} className={styles.posterLink}>
          <img
            src={getPosterUrl(movie.poster_path)}
            alt={movie.title}
            className={styles.poster}
          />
        </Link>

        {/* Рейтинг в нижнем правом углу */}
        <div className={styles.ratingContainer}>
          <div className={styles.ratingCircle} style={{ backgroundColor: ratingColor }}>
            {movie.vote_average.toFixed(1)}
          </div>
        </div>

        {/* Кнопка избранного в верхнем правом углу (видна при наведении) */}
        <FavoriteButton
          movieId={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
          voteAverage={movie.vote_average}
          className={styles.favoriteButton}
        />
      </div>

      {/* Название фильма под карточкой */}
      <h3 className={styles.title}>{movie.title}</h3>
    </div>
  )
}

export default memo(MovieCard)
