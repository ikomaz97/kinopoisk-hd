/**
 * Типы для управления фильтрацией и сортировкой фильмов
 */

import type { SortByValue as SortByValueFromGenres } from '@/shared/constants/genres'

/**
 * Состояние фильтров и сортировки
 */
export type FiltersState = {
  /**
   * Выбранные ID жанров
   */
  genreIds: number[]

  /**
   * Минимальный рейтинг (0-10)
   */
  minRating: number

  /**
   * Максимальный рейтинг (0-10)
   */
  maxRating: number

  /**
   * Параметр сортировки
   */
  sortBy: SortByValueFromGenres

  /**
   * Текущая страница для пагинации
   */
  page: number
}

/**
 * Начальное состояние фильтров
 */
export const INITIAL_FILTERS_STATE: FiltersState = {
  genreIds: [],
  minRating: 0,
  maxRating: 10,
  sortBy: 'popularity.desc',
  page: 1,
}

/**
 * Тип параметра сортировки (переименованный экспорт)
 */
export type SortByValue = SortByValueFromGenres
