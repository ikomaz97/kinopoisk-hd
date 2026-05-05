/**
 * Типы для сущности Actor
 */

/**
 * Информация об актёре
 */
export interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order?: number;
  credit_id: string;
}

/**
 * Ответ с актёрами (касты и съёмочной группы)
 */
export interface ActorCredits {
  id: number;
  cast: Actor[];
  crew: Actor[];
}

/**
 * Результат поиска актёров
 */
export interface ActorSearchResult {
  page: number;
  total_results: number;
  total_pages: number;
  results: Actor[];
}

