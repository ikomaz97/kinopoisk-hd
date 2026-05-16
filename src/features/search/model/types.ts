/**
 * Типы для фичи поиска
 */

/**
 * Параметры поиска
 */
export interface SearchParams {
  /**
   * Текст поискового запроса
   */
  query: string
  /**
   * Номер страницы
   */
  page?: number
}

/**
 * Состояние поиска
 */
export interface SearchState {
  /**
   * Текущий поисковый запрос
   */
  query: string
  /**
   * Результаты поиска
   */
  results: unknown[]
  /**
   * Статус загрузки
   */
  isLoading: boolean
}

