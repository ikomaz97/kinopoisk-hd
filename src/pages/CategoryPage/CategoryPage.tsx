/**
 * Страница категорий фильмов
 * Отображает фильмы выбранной категории
 */

import type { FC } from 'react'
import { useParams } from 'react-router-dom'
import type { Movie } from '@/entities/movie'
import { useGetPopularMoviesQuery, useGetTopRatedMoviesQuery, useGetNowPlayingMoviesQuery, useGetUpcomingMoviesQuery } from '@/entities/movie/api'
import { MovieList } from '@/widgets/MovieList'
import { Loader } from '@/shared/ui/Loader'
import styles from './CategoryPage.module.css'

/**
 * Типы категорий фильмов
 */
type CategoryType = 'popular' | 'top_rated' | 'now_playing' | 'upcoming'

/**
 * Маппинг категорий на русские названия
 */
const CATEGORY_TITLES: Record<CategoryType, string> = {
  popular: 'Популярные фильмы',
  top_rated: 'Лучшие фильмы',
  now_playing: 'Сейчас в прокате',
  upcoming: 'Скоро в прокате',
}

/**
 * Страница категорий фильмов
 * @returns React компонент страницы категорий
 */
const CategoryPage: FC = () => {
  const { type } = useParams<{ type: CategoryType }>()

  const category = type || 'popular'

  // Все хуки вызываются в начале компонента (правило React Hooks)
  const { data: popularMovies, isLoading: popularLoading } = useGetPopularMoviesQuery(1)
  const { data: topRatedMovies, isLoading: topRatedLoading } = useGetTopRatedMoviesQuery(1)
  const { data: nowPlayingMovies, isLoading: nowPlayingLoading } = useGetNowPlayingMoviesQuery(1)
  const { data: upcomingMovies, isLoading: upcomingLoading } = useGetUpcomingMoviesQuery(1)

  // Выбор данных в зависимости от категории
  let movies: Movie[] | undefined
  let isLoading = false

  switch (category) {
    case 'popular':
      movies = popularMovies
      isLoading = popularLoading
      break
    case 'top_rated':
      movies = topRatedMovies
      isLoading = topRatedLoading
      break
    case 'now_playing':
      movies = nowPlayingMovies
      isLoading = nowPlayingLoading
      break
    case 'upcoming':
      movies = upcomingMovies
      isLoading = upcomingLoading
      break
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>{CATEGORY_TITLES[category]}</h1>

      {isLoading ? (
        <Loader />
      ) : movies && movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p className={styles.error}>Не удалось загрузить фильмы</p>
      )}
    </div>
  )
}

export default CategoryPage
