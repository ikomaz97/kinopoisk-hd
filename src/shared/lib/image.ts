// image.ts
/**
 * Утилита для формирования URL изображений TMDB.
 */
export const getMovieImageUrl = (path: string): string =>
  `https://image.tmdb.org/t/p/w500${path}`;

export const getActorImageUrl = (path: string): string =>
  `https://image.tmdb.org/t/p/w185${path}`;

