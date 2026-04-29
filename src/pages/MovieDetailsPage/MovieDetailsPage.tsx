// MovieDetailsPage.tsx
/**
 * Страница деталей фильма.
 */
import React from 'react';
import { useParams } from 'react-router-dom';
import { MovieCard } from '@/entities/movie/ui/MovieCard';
import styles from './MovieDetailsPage.module.css';

export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // ВРЕМЕННО: преобразуем id в число для передачи в MovieCard
  const movieId = id;

  return (
    <section className={styles.movieDetailsPage}>
      <h1>Детали фильма</h1>
      {/* TODO: Загрузить информацию о фильме по id через useGetMovieDetailsQuery */}
      {movieId && <MovieCard movieId={movieId} />}
      {!movieId && <p>Фильм не найден</p>}
    </section>
  );
};
