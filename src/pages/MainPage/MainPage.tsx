/**
 * Главная страница приложения
 * Отображает популярные и лучшие фильмы
 */

import type { FC } from 'react'
import { useGetPopularMoviesQuery, useGetTopRatedMoviesQuery } from '@/entities/movie/api'
import { MovieList } from '@/widgets/MovieList'
import { Loader } from '@/shared/ui/Loader'
import styles from './MainPage.module.css'

/**
 * Главная страница
 * @returns React компонент главной страницы
 */
const MainPage: FC = () => {
  // Получение популярных фильмов
  const { data: popularMovies, isLoading: popularLoading } = useGetPopularMoviesQuery(1)

  // Получение лучших фильмов
  const { data: topRatedMovies, isLoading: topRatedLoading } = useGetTopRatedMoviesQuery(1)

  return (
    <div className={styles.container}>
      {/* Секция популярных фильмов */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Популярные фильмы</h2>
        {popularLoading ? (
          <Loader />
        ) : popularMovies ? (
          <MovieList movies={popularMovies} />
        ) : (
          <p>Не удалось загрузить популярные фильмы</p>
        )}
      </section>

      {/* Секция лучших фильмов */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Лучшие фильмы</h2>
        {topRatedLoading ? (
          <Loader />
        ) : topRatedMovies ? (
          <MovieList movies={topRatedMovies} />
        ) : (
          <p>Не удалось загрузить лучшие фильмы</p>
        )}
      </section>
    </div>
  )
}

export default MainPage

