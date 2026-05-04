/**
 * Кнопка выбора жанра
 * Отображает жанр как чекбокс-кнопку
 */

import type { FC } from 'react'
import type { Genre } from '@/entities/movie'
import styles from './GenreButton.module.css'

/**
 * Пропсы для компонента GenreButton
 */
export interface GenreButtonProps {
  /**
   * Жанр для отображения
   */
  genre: Genre

  /**
   * Выбранные жанры
   */
  selectedGenreIds: number[]

  /**
   * Обработчик переключения жанра
   */
  onToggle: (genreId: number) => void
}

/**
 * Кнопка выбора жанра
 * @param genre жанр для отображения
 * @param selectedGenreIds массив выбранных жанров
 * @param onToggle обработчик переключения
 * @returns React компонент GenreButton
 */
export const GenreButton: FC<GenreButtonProps> = ({ genre, selectedGenreIds, onToggle }) => {
  const isSelected = selectedGenreIds.includes(genre.id)

  return (
    <button
      className={`${styles.button} ${isSelected ? styles.selected : ''}`}
      onClick={() => onToggle(genre.id)}
      type="button"
      aria-pressed={isSelected}
    >
      {genre.name}
    </button>
  )
}
