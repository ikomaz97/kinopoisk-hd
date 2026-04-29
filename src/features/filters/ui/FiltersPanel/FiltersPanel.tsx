// FiltersPanel.tsx
/**
 * Панель фильтров для выбора жанра и рейтинга.
 */
import React, { useCallback } from 'react';
import { GenreButton } from '@/features/filters/ui/GenreButton';
import { RatingSlider } from '@/features/filters/ui/RatingSlider';
import { useFilters } from '@/features/filters/hooks/useFilters';
import styles from './FiltersPanel.module.css';

export const FiltersPanel: React.FC = () => {
  const { selectedGenres, rating, toggleGenre, setRating } = useFilters();

  const handleRatingChange = useCallback(
    (value: number) => {
      setRating(value);
    },
    [setRating]
  );

  return (
    <div className={styles.filtersPanel}>
      <div className={styles.genres}>
        {/* Пример жанров, в реальном проекте список будет динамическим */}
        {['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'].map(genre => (
          <GenreButton
            key={genre}
            genre={genre}
            selected={selectedGenres.includes(genre)}
            onClick={() => toggleGenre(genre)}
          />
        ))}
      </div>
      <RatingSlider rating={rating} onChange={handleRatingChange} />
    </div>
  );
};

