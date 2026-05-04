/**
 * Утилиты для работы с localStorage
 * Сохранение и загрузка данных из локального хранилища
 */

const FAVORITES_KEY = 'favorites'

/**
 * Получить список избранных фильмов из localStorage
 * @returns массив избранных фильмов
 */
export const getFavorites = (): Array<{
  id: number
  title: string
  poster_path: string | null
  vote_average: number
}> => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

/**
 * Сохранить список избранных фильмов в localStorage
 * @param items массив избранных фильмов
 */
export const saveFavorites = (
  items: Array<{
    id: number
    title: string
    poster_path: string | null
    vote_average: number
  }>
): void => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('Ошибка сохранения избранных:', error)
  }
}

