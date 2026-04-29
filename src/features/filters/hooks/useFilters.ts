// useFilters.ts
/**
 * Хук управления состоянием фильтров.
 */
import { useState, useCallback } from 'react';

export const useFilters = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);

  const toggleGenre = useCallback((genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  }, []);

  const setRatingCallback = useCallback((value: number) => {
    setRating(value);
  }, []);

  return { selectedGenres, rating, toggleGenre, setRating: setRatingCallback };
};

