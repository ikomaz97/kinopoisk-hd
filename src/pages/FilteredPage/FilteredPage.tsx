// FilteredPage.tsx
/**
 * Страница с отфильтрованными результатами.
 */
import React from 'react';
import { FiltersPanel } from '@/features/filters/ui/FiltersPanel';
import { MovieList } from '@/widgets/MovieList';
import styles from './FilteredPage.module.css';

export const FilteredPage: React.FC = () => (
  <section className={styles.filteredPage}>
    <h1>Фильтрованные результаты</h1>
    <FiltersPanel />
    <MovieList />
  </section>
);

