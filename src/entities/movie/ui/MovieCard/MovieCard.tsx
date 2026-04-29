// MovieCard.tsx
/**
 * Карточка фильма.
 * Принимает id фильма и отображает постер, название и рейтинг.
 */
import React from 'react';
import styles from './MovieCard.module.css';

type MovieCardProps = {
  /**
   * Идентификатор фильма в TMDB.
   */
  movieId?: string;
};

export const MovieCard: React.FC<MovieCardProps> = ({ movieId }) => {
  return (
    <div className={styles.movieCard}>
      {movieId && <p>Фильм с ID: {movieId}</p>}
      {/* Контент карточки фильма */}
    </div>
  );
};
