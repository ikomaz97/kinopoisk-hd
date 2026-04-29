// CategoryPage.tsx
/**
 * Страница категории фильмов.
 * Параметр :type определяет тип категории (popular, top_rated, upcoming, now_playing).
 */
import React from 'react';
import { useParams } from 'react-router-dom';
import { MovieList } from '@/widgets/MovieList';
import styles from './CategoryPage.module.css';

export const CategoryPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  return (
    <section className={styles.categoryPage}>
      <h1>Категория: {type}</h1>
      <MovieList category={type} />
    </section>
  );
};

