/**
 * Компонент MoviePoster
 * Отображает постер фильма с поддержкой разных размеров
 */

import type { FC } from 'react'
import { getPosterUrl } from '@/shared/lib/image'
import styles from './MoviePoster.module.css'

/**
 * Пропсы для компонента MoviePoster
 */
export interface MoviePosterProps {
  /**
   * Путь до постера из API TMDB
   */
  posterPath: string | null
  /**
   * Размер изображения
   */
  size?: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original'
  /**
   * Дополнительные CSS классы
   */
  className?: string
}

/**
 * Компонент MoviePoster
 * @param posterPath путь до постера
 * @param size размер изображения
 * @param className дополнительные классы
 * @returns React компонент MoviePoster
 */
const MoviePoster: FC<MoviePosterProps> = ({
  posterPath,
  size = 'w342',
  className = ''
}) => {
  return (
    <img
      src={getPosterUrl(posterPath, size)}
      alt="Movie poster"
      className={`${styles.poster} ${className}`}
    />
  )
}

export default MoviePoster
