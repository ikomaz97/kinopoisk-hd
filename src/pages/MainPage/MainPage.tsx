/**
 * Главная страница приложения
 * Отображает четыре категории фильмов: популярные, лучшие, предстоящие и сейчас в прокате
 */

import type { FC } from 'react'
import {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
} from '@/entities/movie/api'
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

  // Получение предстоящих фильмов
  const { data: upcomingMovies, isLoading: upcomingLoading } = useGetUpcomingMoviesQuery(1)

  // Получение фильмов, которые сейчас в прокате
  const { data: nowPlayingMovies, isLoading: nowPlayingLoading } = useGetNowPlayingMoviesQuery(1)

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

       {/* Секция предстоящих фильмов */}
       <section className={styles.section}>
         <h2 className={styles.sectionTitle}>Предстоящие фильмы</h2>
         {upcomingLoading ? (
           <Loader />
         ) : upcomingMovies ? (
           <MovieList movies={upcomingMovies} />
         ) : (
           <p>Не удалось загрузить предстоящие фильмы</p>
         )}
       </section>

       {/* Секция фильмов, которые сейчас в прокате */}
       <section className={styles.section}>
         <h2 className={styles.sectionTitle}>Сейчас в прокате</h2>
         {nowPlayingLoading ? (
           <Loader />
         ) : nowPlayingMovies ? (
           <MovieList movies={nowPlayingMovies} />
         ) : (
           <p>Не удалось загрузить фильмы в прокате</p>
         )}
       </section>
    </div>
  )
}

export default MainPage

