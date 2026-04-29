// MoviePoster.tsx
/**
 * Компонент постера фильма.
 * Принимает путь к изображению и отображает его с fallback.
 */
import React from 'react';
import styles from './MoviePoster.module.css';
import { getMovieImageUrl } from '@/shared/lib/image';

type MoviePosterProps = {
  /**
   * Путь к изображению от TMDB (может быть undefined).
   */
  path?: string;
  /**
   * Альтернативный текст изображения.
   */
  alt?: string;
};

export const MoviePoster: React.FC<MoviePosterProps> = ({ path, alt = 'Poster' }) => {
  const src = path ? getMovieImageUrl(path) : 'https://placehold.co/300x450?text=No+Poster';
  return <img className={styles.poster} src={src} alt={alt} loading="lazy" />;
};

