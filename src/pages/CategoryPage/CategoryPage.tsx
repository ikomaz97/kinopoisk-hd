/**
 * Страница категорий фильмов
 * Отображает фильмы выбранной категории с возможностью смены категории и пагинации
 * Поддерживает как классическую пагинацию, так и бесконечный скролл
 */

import type { FC } from 'react'
import { useCallback, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useMoviesByCategory, type CategoryType } from '@/entities/movie/api'
import { CategoryTabs } from '@/widgets/CategoryTabs'
import { MovieList } from '@/widgets/MovieList'
import { Pagination } from '@/shared/ui/Pagination'
import { LinearProgress } from '@/shared/ui/Loader'
import Skeleton from '@mui/material/Skeleton'
import styles from './CategoryPage.module.css'


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

  // Загружаем ТОЛЬКО нужную категорию вместо всех 4 эндпоинтов
  // Это значительно оптимизирует производительность и снижает нагрузку на API
  const { data, isLoading, error, isFetching } = useMoviesByCategory(category, currentPage)

  // Объединяем фильмы из всех загруженных страниц для бесконечного скролла
  const allMovies = data?.movies || []

  // Проверяем, есть ли ещё страницы для загрузки
  const hasMore = data ? currentPage < data.totalPages : false

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

  /**
   * Обработчик бесконечного скролла
   * Загружает следующую страницу фильмов
   */
  const handleInfiniteScroll = useCallback(() => {
    if (data && currentPage < data.totalPages) {
      const nextPage = currentPage + 1
      navigate(`/category/${category}?page=${nextPage}`)
    }
  }, [data, currentPage, navigate, category])

  // Эффект для бесконечного скролла при достижении низа страницы
  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || !data || currentPage >= data.totalPages) {
        return
      }

      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Если прокрутили до низа страницы (осталось менее 200px до конца)
      if (scrollTop + windowHeight >= documentHeight - 200) {
        handleInfiniteScroll()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isLoading, data, currentPage, handleInfiniteScroll])

  return (
    <div className={styles.container}>
      {/* Компонент выбора категорий */}
      <CategoryTabs activeCategory={category} onCategoryChange={handleCategoryChange} />

      {/* Заголовок категории */}
      <h1 className={styles.pageTitle}>{CATEGORY_TITLES[category]}</h1>

      {/* Контент страницы */}
      {isLoading && !data ? (
        <>
          <Skeleton variant="text" sx={{ fontSize: '2rem', mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={300} />
        </>
      ) : error ? (
        <p className={styles.error}>Ошибка при загрузке фильмов. Попробуйте позже.</p>
      ) : data && data.movies.length > 0 ? (
        <>
          <MovieList movies={allMovies} />
          {isFetching && <LinearProgress />}
          {/* Индикатор загрузки для бесконечного скролла */}
          {hasMore && (
            <div className={styles.loadingMore}>
              <LinearProgress />
              <p className={styles.loadingText}>Загрузка фильмов...</p>
            </div>
          )}
          {/* Компонент пагинации */}
          {data.totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={handlePageChange} />
          )}
        </>
      ) : (
        <p className={styles.error}>Не удалось загрузить фильмы</p>
      )}
    </div>
  )
}

export default CategoryPage
