/**
 * Страница категорий фильмов
 * Отображает фильмы выбранной категории с возможностью смены категории и пагинации
 */

import type { FC } from 'react'
import { useCallback } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import type { Movie } from '@/entities/movie'
import { useGetPopularMoviesQuery, useGetTopRatedMoviesQuery, useGetNowPlayingMoviesQuery, useGetUpcomingMoviesQuery } from '@/entities/movie/api'
import { CategoryTabs } from '@/widgets/CategoryTabs'
import { MovieList } from '@/widgets/MovieList'
import { Pagination } from '@/shared/ui/Pagination'
import { Loader } from '@/shared/ui/Loader'
import { LinearProgress } from '@/shared/ui/Loader'
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
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Получаем текущую категорию из URL параметра или устанавливаем 'popular' по умолчанию
  const category = (type || 'popular') as CategoryType

  // Получаем текущую страницу из query параметра или устанавливаем 1 по умолчанию
  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  // Все хуки вызываются в начале компонента (правило React Hooks)
  const { data: popularData, isLoading: popularLoading, isFetching: popularFetching } = useGetPopularMoviesQuery(currentPage)
  const { data: topRatedData, isLoading: topRatedLoading, isFetching: topRatedFetching } = useGetTopRatedMoviesQuery(currentPage)
  const { data: nowPlayingData, isLoading: nowPlayingLoading, isFetching: nowPlayingFetching } = useGetNowPlayingMoviesQuery(currentPage)
  const { data: upcomingData, isLoading: upcomingLoading, isFetching: upcomingFetching } = useGetUpcomingMoviesQuery(currentPage)

  /**
   * Обработчик смены категории
   * Навигирует на выбранную категорию с параметром page=1
   */
  const handleCategoryChange = useCallback(
    (newCategory: CategoryType) => {
      navigate(`/category/${newCategory}?page=1`)
    },
    [navigate]
  )

  /**
   * Обработчик смены страницы
   * Обновляет query параметр page в URL
   */
  const handlePageChange = useCallback(
    (page: number) => {
      navigate(`/category/${category}?page=${page}`)
      // Прокручиваем к началу страницы
      window.scrollTo(0, 0)
    },
    [navigate, category]
  )

  // Выбираем данные, загрузку и информацию о пагинации в зависимости от категории
  let movies: Movie[] | undefined
  let isLoading = false
  let isFetching = false
  let totalPages = 0

  switch (category) {
    case 'popular':
      movies = popularData?.movies
      isLoading = popularLoading
      isFetching = popularFetching
      totalPages = popularData?.totalPages || 0
      break
    case 'top_rated':
      movies = topRatedData?.movies
      isLoading = topRatedLoading
      isFetching = topRatedFetching
      totalPages = topRatedData?.totalPages || 0
      break
    case 'now_playing':
      movies = nowPlayingData?.movies
      isLoading = nowPlayingLoading
      isFetching = nowPlayingFetching
      totalPages = nowPlayingData?.totalPages || 0
      break
    case 'upcoming':
      movies = upcomingData?.movies
      isLoading = upcomingLoading
      isFetching = upcomingFetching
      totalPages = upcomingData?.totalPages || 0
      break
  }

  return (
    <div className={styles.container}>
      {/* Компонент выбора категорий */}
      <CategoryTabs activeCategory={category} onCategoryChange={handleCategoryChange} />

      {/* Заголовок категории */}
      <h1 className={styles.pageTitle}>{CATEGORY_TITLES[category]}</h1>

      {/* Контент страницы */}
      {isLoading ? (
        <Loader />
      ) : movies && movies.length > 0 ? (
        <>
          <MovieList movies={movies} />
          {isFetching && <LinearProgress />}
          {/* Компонент пагинации */}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      ) : (
        <p className={styles.error}>Не удалось загрузить фильмы</p>
      )}
    </div>
  )
}

export default CategoryPage
