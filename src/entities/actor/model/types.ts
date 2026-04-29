// types.ts
/**
 * ВРЕМЕННО: Типы для актёра (заглушка).
 * TODO: Заполнить полные данные после получения API ответа.
 */

export interface Actor {
  /** Идентификатор актёра */
  id: number;
  /** Имя актёра */
  name: string;
  /** Фото профиля (путь от TMDB) */
  profile_path?: string | null;
}

