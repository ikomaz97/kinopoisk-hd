/**
 * Карточка фильма
 * Отображает постер, название, рейтинг и кнопку избранного
 * При клике перенаправляет на страницу деталей фильма
 */

import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { getPosterUrl } from '@/shared/lib/image'
import { FavoriteButton } from '@/features/favorites/ui'
import { Badge } from '@/shared/ui/Badge'
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
  const getRatingColor = (rating: number): 'green' | 'yellow' | 'red' => {
    if (rating >= 8) return 'green'
    if (rating >= 6) return 'yellow'
    return 'red'
  }

  const ratingColor = getRatingColor(movie.vote_average)

  return (
    <Link to={`/movie/${movie.id}`} className={styles.card}>
      {/* Постер фильма с заглушкой при отсутствии */}
      <div className={styles.posterContainer}>
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          className={styles.poster}
        />
      </div>

      {/* Название фильма */}
      <h3 className={styles.title}>{movie.title}</h3>

      {/* Рейтинг с цветным индикатором */}
      <Badge variant={ratingColor} className={styles.ratingBadge}>
        ⭐ {movie.vote_average.toFixed(1)}
      </Badge>

      {/* Кнопка добавления в избранное */}
      <FavoriteButton
        movieId={movie.id}
        title={movie.title}
        posterPath={movie.poster_path}
        voteAverage={movie.vote_average}
        className={styles.favoriteButton}
      />
    </Link>
  )
}

export default memo(MovieCard)
