/**
 * Кнопка выбора жанра
 * Отображает жанр как чекбокс-кнопку
 */

import type { FC } from 'react'
import { GENRES } from '@/shared/constants/genres'
import styles from './GenreButton.module.css'

/**
 * Пропсы для компонента GenreButton
 */
export interface GenreButtonProps {
  /**
   * ID жанра
   */
  genreId: number

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
 * @param genreId ID жанра
 * @param selectedGenreIds массив выбранных жанров
 * @param onToggle обработчик переключения
 * @returns React компонент GenreButton
 */
export const GenreButton: FC<GenreButtonProps> = ({ genreId, selectedGenreIds, onToggle }) => {
  const genre = GENRES.find((g) => g.id === genreId)
  if (!genre) return null

  const isSelected = selectedGenreIds.includes(genreId)

  return (
    <button
      className={`${styles.button} ${isSelected ? styles.selected : ''}`}
      onClick={() => onToggle(genreId)}
      type="button"
    >
      {genre.name}
    </button>
  )
}
