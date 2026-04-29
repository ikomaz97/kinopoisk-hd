// MainPage.tsx
/**
 * Главная страница приложения.
 * Отображает список популярных фильмов.
 */
import React from 'react';
import { MovieList } from '@/widgets/MovieList';
import styles from './MainPage.module.css';

export const MainPage: React.FC = () => (
  <section className={styles.mainPage}>
    <h1>Главная</h1>
    <MovieList />
  </section>
);

