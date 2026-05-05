/**
 * Страница поиска фильмов
 * Позволяет искать фильмы по названию
 */

import type { FC, ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearchMoviesQuery } from '@/entities/movie/api'
import { MovieList } from '@/widgets/MovieList'
import { Loader } from '@/shared/ui/Loader'
import { LinearProgress } from '@/shared/ui/Loader'
import styles from './SearchPage.module.css'

/**
 * Страница поиска фильмов
 * @returns React компонент страницы поиска
 */
const SearchPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // Получаем query напрямую из URL параметров
  const searchQuery = searchParams.get('query') || ''

  /**
   * Обработчик изменения текста в поле поиска
   * Обновляет URL параметр query
   * @param event событие изменения input
   */
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value.trim()) {
      setSearchParams({ query: value.trim() })
    } else {
      setSearchParams({})
    }
  }

  // Поиск фильмов по запросу
  const { data: searchResults, isLoading, isFetching } = useSearchMoviesQuery(
    searchQuery.trim() ? { query: searchQuery.trim() } : { query: '' },
    { skip: !searchQuery.trim() }
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Поиск фильмов</h1>

      {/* Поле поиска */}
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Введите название фильма..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Результаты поиска */}
      {isLoading ? (
        <Loader />
      ) : searchResults && searchResults.results.length > 0 ? (
        <>
          <MovieList movies={searchResults.results} />
          {isFetching && <LinearProgress />}
        </>
      ) : searchQuery.trim() ? (
        <p className={styles.comingSoon}>Ничего не найдено</p>
      ) : (
        <p className={styles.comingSoon}>Введите название фильма для поиска</p>
      )}
    </div>
  )
}

export default SearchPage
