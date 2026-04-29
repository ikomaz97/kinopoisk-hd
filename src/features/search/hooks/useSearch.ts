// useSearch.ts
/**
 * Хук для выполнения поиска фильмов.
 * Возвращает функцию `search` которая триггерит RTK Query эндпоинт.
 */
import { useCallback } from 'react';
import { useLazySearchMoviesQuery } from '@/entities/movie/api/movieApi';

export const useSearch = () => {
  const [triggerSearch] = useLazySearchMoviesQuery();

  const search = useCallback(
    (query: string) => {
      triggerSearch(query);
    },
    [triggerSearch]
  );

  return { search };
};

