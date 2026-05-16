/**
 * Константы жанров TMDB и параметры сортировки
 * Используются для фильтрации и сортировки фильмов
 */

/** Жанры TMDB с их ID и названиями */
export const GENRES = [
  { id: 28, name: 'Боевик' },
  { id: 12, name: 'Приключения' },
  { id: 16, name: 'Мультфильм' },
  { id: 35, name: 'Комедия' },
  { id: 80, name: 'Криминал' },
  { id: 99, name: 'Документальный' },
  { id: 18, name: 'Драма' },
  { id: 10751, name: 'Семейный' },
  { id: 14, name: 'Фэнтези' },
  { id: 36, name: 'История' },
  { id: 27, name: 'Ужас' },
  { id: 10402, name: 'Музыка' },
  { id: 9648, name: 'Мистика' },
  { id: 10749, name: 'Романтика' },
  { id: 878, name: 'Научная фантастика' },
  { id: 10770, name: 'ТВ-фильм' },
  { id: 53, name: 'Триллер' },
  { id: 10752, name: 'Война' },
  { id: 37, name: 'Вестерн' },
] as const

/** Параметры сортировки для discover API */
export const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'По популярности (убывание)' },
  { value: 'popularity.asc', label: 'По популярности (возрастание)' },
  { value: 'vote_average.desc', label: 'По рейтингу (убывание)' },
  { value: 'vote_average.asc', label: 'По рейтингу (возрастание)' },
  { value: 'release_date.desc', label: 'По дате выхода (новые)' },
  { value: 'release_date.asc', label: 'По дате выхода (старые)' },
  { value: 'title.asc', label: 'По названию (A-Z)' },
  { value: 'title.desc', label: 'По названию (Z-A)' },
] as const

/** Тип параметра сортировки */
export type SortByValue = typeof SORT_OPTIONS[number]['value']
