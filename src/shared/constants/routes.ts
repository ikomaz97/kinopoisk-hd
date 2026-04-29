// routes.ts
/**
 * Константы маршрутов приложения.
 */
export const ROUTES = {
  HOME: '/',
  CATEGORY: '/category/:type',
  SEARCH: '/search',
  FILTERED: '/filtered',
  MOVIE_DETAILS: '/movie/:id',
  FAVORITES: '/favorites',
  NOT_FOUND: '*',
} as const;

