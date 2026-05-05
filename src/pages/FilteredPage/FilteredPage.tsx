/**
 * Страница фильтрации и сортировки фильмов
 * Позволяет фильтровать фильмы по жанрам и рейтингу, сортировать и пагинировать результаты
 */

import type { FC } from 'react'
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { AppDispatch, RootState } from '@/app'
import type { FiltersState } from '@/features/filters'
import { setPage, resetFilters } from '@/features/filters'
import { useDiscoverMoviesQuery } from '@/entities/movie/api'
import { FiltersPanel } from '@/features/filters/ui'
import { MovieList } from '@/widgets/MovieList'
import { Pagination } from '@/shared/ui/Pagination'
import { Loader } from '@/shared/ui/Loader'
import { LinearProgress } from '@/shared/ui/Loader'
import styles from './FilteredPage.module.css'

/**
 * Страница фильтрации фильмов
 * @returns React компонент страницы фильтрации
 */
const FilteredPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const filters = useSelector<RootState, FiltersState>((state) => state.filters)

  // Запрашиваем фильмы с параметрами фильтрации
  const { data, isLoading, error, isFetching } = useDiscoverMoviesQuery({
    genreIds: filters.genreIds,
    minRating: filters.minRating,
    sortBy: filters.sortBy,
    page: filters.page,
  })

  /**
   * Обработчик смены страницы
   * Обновляет Redux-состояние и синхронизирует с URL
   */
  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(setPage(page))
      navigate(`/filtered?page=${page}`, { replace: true })
      window.scrollTo(0, 0)
    },
    [dispatch, navigate]
  )

  /**
   * Обработчик сброса фильтров
   * Сбрасывает Redux-состояние и перенаправляет на страницу с фильтрами
   */
  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters())
    navigate('/filtered')
    window.scrollTo(0, 0)
  }, [dispatch, navigate])

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Фильтрация фильмов</h1>

      <div className={styles.content}>
        {/* Левая колонка: панель фильтров */}
        <FiltersPanel onReset={handleResetFilters} />

        {/* Правая колонка: список фильмов */}
        <main className={styles.main}>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <p className={styles.error}>Ошибка при загрузке фильмов. Попробуйте позже.</p>
          ) : data && data.movies.length > 0 ? (
            <>
              <MovieList movies={data.movies} />
              {isFetching && <LinearProgress />}
              {data.totalPages > 1 && (
                <Pagination
                  currentPage={filters.page}
                  totalPages={data.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <p className={styles.noResults}>
              По выбранным фильтрам ничего не найдено. Попробуйте изменить параметры.
            </p>
          )}
        </main>
      </div>
    </div>
  )
}

export default FilteredPage
