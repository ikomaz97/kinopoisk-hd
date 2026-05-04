/**
 * Панель фильтров и сортировки
 * Содержит выбор жанров, слайдер рейтинга и селект сортировки
 */

import type { FC } from 'react'
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from '@/app'
import type { FiltersState, SortByValue } from '@/features/filters'
import { toggleGenre, setMinRating, setSortBy, resetFilters } from '@/features/filters'
import { SORT_OPTIONS } from '@/shared/constants/genres'
import { GenreButton } from '@/features/filters/ui/GenreButton'
import { RatingSlider } from '@/features/filters/ui/RatingSlider'
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
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Рейтинг */}
      <div className={styles.filterSection}>
        <RatingSlider value={filters.minRating} onChange={handleRatingChange} />
      </div>

      {/* Жанры */}
      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Жанры</h3>
        <div className={styles.genreButtons}>
          {filters.genreIds.length === 0 && (
            <span className={styles.noSelection}>Выберите жанры</span>
          )}
          {filters.genreIds.map((genreId) => (
            <GenreButton
              key={genreId}
              genreId={genreId}
              selectedGenreIds={filters.genreIds}
              onToggle={handleToggleGenre}
            />
          ))}
        </div>
      </div>

      {/* Кнопка сброса */}
      <button onClick={handleReset} className={styles.resetButton} type="button">
        Сбросить фильтры
      </button>
    </aside>
  )
}
