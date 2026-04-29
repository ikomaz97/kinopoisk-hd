// RatingSlider.tsx
/**
 * Слайдер выбора минимального рейтинга.
 */
import React from 'react';
import styles from './RatingSlider.module.css';

type RatingSliderProps = {
  rating: number;
  onChange: (value: number) => void;
};

export const RatingSlider: React.FC<RatingSliderProps> = ({ rating, onChange }) => (
  <div className={styles.ratingSlider}>
    <label className={styles.label}>Рейтинг: {rating}</label>
    <input
      type="range"
      min={0}
      max={10}
      step={0.5}
      value={rating}
      onChange={e => onChange(Number(e.target.value))}
      className={styles.input}
    />
  </div>
);

