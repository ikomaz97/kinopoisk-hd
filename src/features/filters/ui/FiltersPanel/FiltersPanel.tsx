/**
 * Панель фильтров и сортировки
 * Содержит выбор жанров, слайдер рейтинга и селект сортировки
 */

import type { FC } from 'react'
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from '@/app'
import type { FiltersState } from '@/features/filters'
import { toggleGenre, setMinRating, setSortBy, resetFilters } from '@/features/filters'
import type { Genre, GenreListResponse } from '@/entities/movie'
import { useGetGenresQuery } from '@/entities/movie/api'
import type { SortByValue } from '@/shared/constants/genres'
import { RatingSlider } from '@/features/filters/ui/RatingSlider'
import { GenreButton } from '@/features/filters/ui/GenreButton'
import styles from './FiltersPanel.module.css'

/**
 * Пропсы для компонента FiltersPanel
 */
interface FiltersPanelProps {
  /**
   * Обработчик сброса фильтров (опционально)
   */
  onReset?: () => void
}

/**
 * Панель фильтров
 * @param onReset обработчик сброса фильтров
 * @returns React компонент FiltersPanel
 */
export const FiltersPanel: FC<FiltersPanelProps> = ({ onReset }) => {
  const dispatch = useDispatch<AppDispatch>()
  const filters = useSelector<RootState, FiltersState>((state) => state.filters)

  // Загружаем список жанров из TMDB API
  const { data: genres, isLoading: genresLoading, error: genresError } = useGetGenresQuery()

  /**
   * Обработчик переключения жанра
   */
  const handleToggleGenre = useCallback(
    (genreId: number) => {
      dispatch(toggleGenre(genreId))
    },
    [dispatch]
  )

  /**
   * Обработчик изменения рейтинга
   */
  const handleRatingChange = useCallback(
    (value: number) => {
      dispatch(setMinRating(value))
    },
    [dispatch]
  )

  /**
   * Обработчик изменения сортировки
   */
  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setSortBy(e.target.value as SortByValue))
    },
    [dispatch]
  )

  /**
   * Обработчик сброса фильтров
   */
  const handleReset = useCallback(() => {
    dispatch(resetFilters())
    onReset?.()
  }, [dispatch, onReset])

  return (
    <aside className={styles.filtersPanel}>
      <h2 className={styles.panelTitle}>Фильтры и сортировка</h2>

      {/* Сортировка */}
      <div className={styles.filterSection}>
        <label htmlFor="sort-by" className={styles.label}>
          Сортировка:
        </label>
        <select
          id="sort-by"
          value={filters.sortBy}
          onChange={handleSortChange}
          className={styles.select}
        >
          <option value="popularity.desc">По популярности (убывание)</option>
          <option value="popularity.asc">По популярности (возрастание)</option>
          <option value="vote_average.desc">По рейтингу (убывание)</option>
          <option value="vote_average.asc">По рейтингу (возрастание)</option>
          <option value="release_date.desc">По дате выхода (новые)</option>
          <option value="release_date.asc">По дате выхода (старые)</option>
          <option value="title.asc">По названию (A-Z)</option>
          <option value="title.desc">По названию (Z-A)</option>
        </select>
      </div>

      {/* Рейтинг */}
      <div className={styles.filterSection}>
        <RatingSlider value={filters.minRating} onChange={handleRatingChange} />
      </div>

      {/* Жанры */}
      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Жанры</h3>
        {genresLoading ? (
          <p className={styles.loading}>Загрузка жанров...</p>
        ) : genresError ? (
          <p className={styles.error}>Ошибка загрузки жанров</p>
        ) : genres && (genres as GenreListResponse).genres && (genres as GenreListResponse).genres.length > 0 ? (
          <div className={styles.genreButtons}>
            {(genres as GenreListResponse).genres.map((genre: Genre) => (
              <GenreButton
                key={genre.id}
                genre={genre}
                selectedGenreIds={filters.genreIds}
                onToggle={handleToggleGenre}
              />
            ))}
          </div>
        ) : (
          <p className={styles.noSelection}>Жанры не найдены</p>
        )}
      </div>

      {/* Кнопка сброса */}
      <button onClick={handleReset} className={styles.resetButton} type="button">
        Сбросить фильтры
      </button>
    </aside>
  )
}
