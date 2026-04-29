// schemas.ts
/**
 * Zod‑схемы для валидации данных фильма.
 */
import { z } from 'zod';

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable().optional(),
  backdrop_path: z.string().nullable().optional(),
  vote_average: z.number(),
  release_date: z.string().nullable().optional(),
});

