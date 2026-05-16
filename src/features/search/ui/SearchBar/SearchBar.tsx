/**
 * Компонент SearchBar
 * Панель поиска фильмов с кнопкой отправки
 */

import type { FC, ChangeEvent } from 'react'
import { useCallback } from 'react'
import { SearchInput } from '@/shared/ui/SearchInput'
import styles from './SearchBar.module.css'

/**
 * Пропсы для компонента SearchBar
 */
export interface SearchBarProps {
  /**
   * Текущее значение поиска
   */
  value: string
  /**
   * Обработчик изменения значения
   */
  onChange: (value: string) => void
  /**
   * Обработчик отправки поиска
   */
  onSubmit?: (value: string) => void
  /**
   * Дополнительные CSS-классы
   */
  className?: string
}

/**
 * Компонент панели поиска фильмов
 * @param value текущее значение
 * @param onChange обработчик изменения
 * @param onSubmit обработчик отправки
 * @param className дополнительные классы
 * @returns React компонент SearchBar
 */
const SearchBar: FC<SearchBarProps> = ({ value, onChange, onSubmit, className = '' }) => {
  /**
   * Обработчик изменения текста в поле поиска
   */
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value)
    },
    [onChange]
  )

  /**
   * Обработчик отправки формы
   */
  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
      onSubmit?.(value)
    },
    [onSubmit, value]
  )

  return (
    <form className={`${styles.searchBar} ${className}`} onSubmit={handleSubmit}>
      <SearchInput
        value={value}
        onChange={handleChange}
        placeholder="Введите название фильма..."
        className={styles.input}
      />
      <button type="submit" className={styles.button} aria-label="Поиск">
        🔍
      </button>
    </form>
  )
}

export default SearchBar
