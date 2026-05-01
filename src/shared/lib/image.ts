/**
 * Утилиты для работы с изображениями из TMDB
 * Формирование URL-адресов на основе путей от API
 */

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

/**
 * Генерирует полный URL для постера фильма
 * @param posterPath путь до постера из API TMDB
 * @param size размер изображения (w92, w154, w185, w342, w500, w780, original)
 * @returns полный URL или плейсхолдер если нет пути
 */
export const getPosterUrl = (posterPath: string | null, size: string = 'w342'): string => {
  if (!posterPath) {
    return 'https://placehold.co/300x450?text=No+Poster'
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${posterPath}`
}

/**
 * Генерирует полный URL для фонового изображения фильма
 * @param backdropPath путь до backdrop из API TMDB
 * @param size размер изображения (w300, w780, w1280, original)
 * @returns полный URL или плейсхолдер если нет пути
 */
export const getBackdropUrl = (backdropPath: string | null, size: string = 'w1280'): string => {
  if (!backdropPath) {
    return 'https://placehold.co/1280x720?text=No+Image'
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${backdropPath}`
}

/**
 * Генерирует полный URL для фото актера/режиссера
 * @param profilePath путь до фото из API TMDB
 * @param size размер изображения (w45, w185, h632, original)
 * @returns полный URL или плейсхолдер если нет пути
 */
export const getProfileUrl = (profilePath: string | null, size: string = 'w185'): string => {
  if (!profilePath) {
    return 'https://placehold.co/185x278?text=No+Photo'
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${profilePath}`
}

