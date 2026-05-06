/**
 * Хук для управления фильтрами с синхронизацией localStorage
 */

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { FiltersState } from '@/features/filters'
import { toggleGenre, setMinRating, setSortBy, setPage, setMaxRating } from '@/features/filters'
import type { SortByValue } from '@/shared/constants/genres'
import type { RootState } from '@/app'
import { getFromStorage, setToStorage } from '@/shared/lib/storage'

/**
 * Хук для управления фильтрами
 * Синхронизирует состояние с localStorage
 * @returns объект с состоянием фильтров и action creators
 */
export const useFilters = () => {
  const dispatch = useDispatch()
  const filters = useSelector<RootState, FiltersState>((state) => state.filters)

  // Синхронизация с localStorage при загрузке
  useEffect(() => {
    const savedFilters = getFromStorage<FiltersState>('filters')
    if (savedFilters) {
      // Восстанавливаем только те параметры, которые имеют смысл
      if (savedFilters.genreIds) {
        savedFilters.genreIds.forEach((genreId: number) => dispatch(toggleGenre(genreId)))
      }
      if (savedFilters.minRating !== undefined) {
        dispatch(setMinRating(savedFilters.minRating))
      }
      if (savedFilters.maxRating !== undefined) {
        // Добавляем восстановление maxRating
        dispatch(setMaxRating(savedFilters.maxRating))
      }
      if (savedFilters.sortBy) {
        dispatch(setSortBy(savedFilters.sortBy as SortByValue))
      }
    }
  }, [dispatch])

  // Синхронизация с localStorage при изменении фильтров
  useEffect(() => {
    // Не сохраняем страницу, так как она меняется при навигации
    const filtersToSave: Omit<FiltersState, 'page'> = {
      genreIds: filters.genreIds,
      minRating: filters.minRating,
      maxRating: filters.maxRating,
      sortBy: filters.sortBy,
    }
    setToStorage('filters', filtersToSave)
  }, [filters.genreIds, filters.minRating, filters.maxRating, filters.sortBy])

  return {
    filters,
    toggleGenre: (genreId: number) => dispatch(toggleGenre(genreId)),
    setMinRating: (value: number) => dispatch(setMinRating(value)),
    setSortBy: (value: string) => dispatch(setSortBy(value as SortByValue)),
    setPage: (page: number) => dispatch(setPage(page)),
  }
}
