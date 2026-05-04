/**
 * Экспорт типов, схем и логики фильтров
 */

export { filtersSlice, toggleGenre, setMinRating, setSortBy, setPage, resetFilters } from './filtersSlice'
export type { FiltersState, SortByValue } from './types'
export { INITIAL_FILTERS_STATE } from './types'
