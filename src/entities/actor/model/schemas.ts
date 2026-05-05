/**
 * Zod‑схемы для валидации ответов TMDB API об актёрах
 */

import { z } from 'zod';
import type { Actor, ActorCredits, ActorSearchResult } from './types';

/**
 * Схема актёра
 */
export const ActorSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
  order: z.number().optional(),
  credit_id: z.string(),
}) as unknown as z.ZodType<Actor>;

/**
 * Схема ответа с актёрами (касты и съёмочной группы)
 */
export const ActorCreditsSchema = z.object({
  id: z.number(),
  cast: z.array(ActorSchema),
  crew: z.array(ActorSchema),
}) as unknown as z.ZodType<ActorCredits>;

/**
 * Схема результата поиска актёров
 */
export const ActorSearchSchema = z.object({
  page: z.number(),
  total_results: z.number(),
  total_pages: z.number(),
  results: z.array(ActorSchema),
}) as unknown as z.ZodType<ActorSearchResult>;

