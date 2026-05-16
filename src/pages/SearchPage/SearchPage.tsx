/**
 * Страница поиска фильмов
 * Позволяет искать фильмы по названию с пагинацией
 */

import type { FC, ChangeEvent } from 'react'
import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearchMoviesQuery } from '@/entities/movie/api'
import { MovieList } from '@/widgets/MovieList'
import { Pagination } from '@/shared/ui/Pagination'
import { LinearProgress } from '@/shared/ui/Loader'
import { Skeleton } from '@/shared/ui/Skeleton'
import { SearchInput } from '@/shared/ui/SearchInput'
import styles from './SearchPage.module.css'

/**
 * Страница поиска фильмов
 * @returns React компонент страницы поиска
 */
const SearchPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // Получаем query из URL параметров
  const searchQuery = searchParams.get('query') || ''
  // Получаем номер текущей страницы из URL параметров
  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  /**
   * Обработчик изменения текста в поле поиска
   * Обновляет URL параметр query и сбрасывает страницу на 1
   */
  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value.trim()) {
      setSearchParams({ query: value.trim(), page: '1' })
    } else {
      setSearchParams({})
    }
  }, [setSearchParams])

  /**
   * Обработчик очистки поля поиска
   * Сбрасывает URL параметры и выдачу
   */
  const handleClear = useCallback(() => {
    setSearchParams({})
  }, [setSearchParams])

  /**
   * Обработчик смены страницы
   */
  const handlePageChange = useCallback((page: number) => {
    setSearchParams({ query: searchQuery, page: page.toString() })
    window.scrollTo(0, 0)
  }, [searchQuery, setSearchParams])

  // Поиск фильмов по запросу
  const { data: searchResults, isLoading, isFetching } = useSearchMoviesQuery(
    searchQuery.trim() ? { query: searchQuery.trim(), page: currentPage } : { query: '', page: 1 },
    { skip: !searchQuery.trim() }
  )

  // Результаты поиска
  const movies = searchResults?.results || []
  const totalPages = searchResults?.total_pages || 1

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Поиск фильмов</h1>

      {/* Поле поиска с крестиком очистки */}
      <div className={styles.searchWrapper}>
        <SearchInput
          className={styles.searchInput}
          placeholder="Введите название фильма..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Очистить поиск"
            type="button"
          >
            ✕
          </button>
        )}
      </div>

      {/* Результаты поиска */}
      {isLoading ? (
        <div className={styles.skeletonGrid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" />
          ))}
        </div>
      ) : movies.length > 0 ? (
        <>
          <MovieList movies={movies} />
          {isFetching && <LinearProgress />}
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </>
      ) : searchQuery.trim() ? (
        <p className={styles.comingSoon}>По запросу «{searchQuery}» ничего не найдено</p>
      ) : (
        <p className={styles.comingSoon}>Введите название фильма для поиска</p>
      )}
    </div>
  )
}

export default SearchPage
