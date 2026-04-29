// FavoritesPage.tsx
/**
 * Страница избранного.
 */
import React from 'react';
import { MovieList } from '@/widgets/MovieList';
import styles from './FavoritesPage.module.css';

export const FavoritesPage: React.FC = () => (
  <section className={styles.favoritesPage}>
    <h1>Избранное</h1>
    <MovieList showFavorites />
  </section>
);

