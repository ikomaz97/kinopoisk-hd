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
import { MovieSection } from '@/widgets/MovieSection'
import { ROUTES } from '@/shared/constants/routes'
import { WelcomeSection } from '@/widgets/WelcomeSection'
import styles from './MainPage.module.css'

/**
 * Главная страница
 * @returns React компонент главной страницы
 */
const MainPage: FC = () => {
  // Загрузка популярных фильмов
  const { data: popularMovies, isLoading: popularLoading } = useGetPopularMoviesQuery(1)
  // Загрузка лучших фильмов
  const { data: topRatedMovies, isLoading: topRatedLoading } = useGetTopRatedMoviesQuery(1)
  // Загрузка предстоящих фильмов
  const { data: upcomingMovies, isLoading: upcomingLoading } = useGetUpcomingMoviesQuery(1)
  // Загрузка фильмов в прокате
  const { data: nowPlayingMovies, isLoading: nowPlayingLoading } = useGetNowPlayingMoviesQuery(1)

  return (
    <div className={styles.container}>
      {/* Приветственная секция с поиском и случайным бэкдропом */}
      <WelcomeSection _onSearch={() => {}} />

      {/* Секция популярных фильмов */}
      <MovieSection
        title="Популярные фильмы"
        movies={popularMovies?.movies}
        isLoading={popularLoading}
        categoryPath={`${ROUTES.CATEGORY}/popular`}
      />

      {/* Секция лучших фильмов */}
      <MovieSection
        title="Лучшие фильмы"
        movies={topRatedMovies?.movies}
        isLoading={topRatedLoading}
        categoryPath={`${ROUTES.CATEGORY}/top_rated`}
      />

      {/* Секция предстоящих фильмов */}
      <MovieSection
        title="Предстоящие фильмы"
        movies={upcomingMovies?.movies}
        isLoading={upcomingLoading}
        categoryPath={`${ROUTES.CATEGORY}/upcoming`}
      />

      {/* Секция фильмов в прокате */}
      <MovieSection
        title="Сейчас в прокате"
        movies={nowPlayingMovies?.movies}
        isLoading={nowPlayingLoading}
        categoryPath={`${ROUTES.CATEGORY}/now_playing`}
      />
    </div>
  )
}

export default MainPage
