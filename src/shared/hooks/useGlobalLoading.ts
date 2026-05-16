/**
 * Хук для отслеживания глобального состояния загрузки
 * Отслеживает все активные запросы и мутации RTK Query
 */

import type { RootState } from '@/app/providers/StoreProvider'
import { useSelector } from 'react-redux'

/**
 * Список эндпоинтов для исключения из глобального индикатора загрузки
 */
const excludedEndpoints = [
  'getPopularMovies',
  'getTopRatedMovies',
  'getNowPlayingMovies',
  'getUpcomingMovies',
  'searchMovies',
  'getMovieDetails',
  'getSimilarMovies',
  'discoverMovies',
  'getGenres',
]

/**
 * Хук для отслеживания глобального состояния загрузки
 * @returns true, если есть активные запросы или мутации
 */
export const useGlobalLoading = () => {
  return useSelector((state: RootState) => {
    // Получаем все активные запросы из RTK Query API
    const queries = Object.values(state.baseApi.queries || {})
    const mutations = Object.values(state.baseApi.mutations || {})

    // Проверяем, есть ли активные запросы (статус 'pending')
    const hasActiveQueries = queries.some((query) => {
      if (query?.status !== 'pending') return false
      // Исключаем эндпоинты из списка excludedEndpoints
      if (excludedEndpoints.includes(query.endpointName)) {
        const completedQueries = queries.filter((q) => q?.status === 'fulfilled')
        return completedQueries.length > 0
      }
      return true
    })

    const hasActiveMutations = mutations.some((mutation) => mutation?.status === 'pending')

    return hasActiveQueries || hasActiveMutations
  })
}
