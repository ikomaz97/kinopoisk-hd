// schemas.ts
/**
 * ВРЕМЕННО: Zod-схемы для актёра (заглушка).
 * TODO: Расширить схему после реализации API.
 */
import { z } from 'zod';

export const ActorSchema = z.object({
  id: z.number(),
  name: z.string(),
  profile_path: z.string().nullable().optional(),
});

