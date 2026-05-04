/**
 * Утилиты для работы с localStorage
 * Сохранение и загрузка данных из локального хранилища
 */

const FAVORITES_KEY = 'favorites'

/**
 * Получить данные из localStorage по ключу
 * @param key ключ localStorage
 * @returns распарсенные данные или undefined
 */
export const getFromStorage = <T,>(key: string): T | undefined => {
  try {
    const data = localStorage.getItem(key)
    return data ? (JSON.parse(data) as T) : undefined
  } catch {
    return undefined
  }
}

/**
 * Сохранить данные в localStorage по ключу
 * @param key ключ localStorage
 * @param data данные для сохранения
 */
export const setToStorage = <T,>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Ошибка сохранения в localStorage для ключа "${key}":`, error)
  }
}

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
