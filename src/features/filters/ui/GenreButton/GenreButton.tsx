// GenreButton.tsx
/**
 * Кнопка выбора жанра.
 */
import React from 'react';
import styles from './GenreButton.module.css';

type GenreButtonProps = {
  genre: string;
  selected: boolean;
  onClick: () => void;
};

export const GenreButton: React.FC<GenreButtonProps> = ({ genre, selected, onClick }) => (
  <button
    className={`${styles.genreButton} ${selected ? styles.selected : ''}`}
    onClick={onClick}
    aria-pressed={selected}
  >
    {genre}
  </button>
);

