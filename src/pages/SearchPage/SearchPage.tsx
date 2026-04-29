// SearchPage.tsx
/**
 * Страница поиска фильмов.
 */
import React from 'react';
import { SearchBar } from '@/features/search/ui/SearchBar';
import { MovieList } from '@/widgets/MovieList';
import styles from './SearchPage.module.css';

export const SearchPage: React.FC = () => (
  <section className={styles.searchPage}>
    <h1>Поиск</h1>
    <SearchBar />
    <MovieList />
  </section>
);

