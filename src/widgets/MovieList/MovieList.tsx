// MovieList.tsx
/**
 * Виджет списка фильмов.
 * Принимает опциональные пропсы для фильтрации/избранного.
 */
import React from 'react';
import { MovieCard } from '@/entities/movie/ui/MovieCard';
import styles from './MovieList.module.css';

type MovieListProps = {
  /**
   * Фильтрация по категории (например, popular, top_rated и т.д.)
   */
  category?: string;
  /**
   * Показать только избранные фильмы.
   */
  showFavorites?: boolean;
};

export const MovieList: React.FC<MovieListProps> = () => {
  // TODO: подключить данные из RTK Query и/или Redux
  return (
      <div className={styles.movieList}>
        {/* Здесь будет рендер списка MovieCard */}
        <MovieCard />
      </div>
  );
};