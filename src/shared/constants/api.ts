/**
 * Константы для работы с TMDB API
 * Базовый URL, токен доступа и настройки запросов
 */

/** Базовый URL TMDB API */
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

/** Версия API */
export const TMDB_API_VERSION = '3'

/** Базовый URL для изображений TMDB */
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

/** Размеры постеров */
export const POSTER_SIZES = {
  small: 'w185',
  medium: 'w342',
  large: 'w500',
  original: 'original',
} as const

/** Размеры фото актёров */
export const PROFILE_SIZES = {
  small: 'w45',
  medium: 'w185',
  large: 'h632',
  original: 'original',
} as const

/** Размеры бэкдропов */
export const BACKDROP_SIZES = {
  small: 'w300',
  medium: 'w780',
  large: 'w1280',
  original: 'original',
} as const

/**
 * Токен доступа к TMDB API из переменных окружения
 * ВАЖНО: должен быть задан в .env.local (VITE_TMDB_ACCESS_TOKEN)
 */
export const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN as string

/**
 * Проверяем наличие токена и логируем ошибку при разработке
 * Это поможет быстро выявить конфигурационные ошибки
 */
if (!TMDB_ACCESS_TOKEN) {
  const errorMessage =
    'Ошибка конфигурации: VITE_TMDB_ACCESS_TOKEN не установлен в переменных окружения. ' +
    'Пожалуйста, создайте файл .env.local и добавьте: VITE_TMDB_ACCESS_TOKEN=your_token_here'

  console.error(errorMessage)

  // При разработке выбросим ошибку для немедленного обнаружения проблемы
  if (import.meta.env.DEV) {
    throw new Error(errorMessage)
  }
}

/** Язык запросов по умолчанию */
export const DEFAULT_LANGUAGE = 'ru-RU'

/** Регион по умолчанию */
export const DEFAULT_REGION = 'RU'
