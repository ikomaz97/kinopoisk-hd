/**
 * Компонент поля ввода поиска
 * Переиспользуемое поле поиска с едиными стилями
 */

import type { FC, ChangeEvent, InputHTMLAttributes } from 'react'
import styles from './SearchInput.module.css'

/**
 * Пропсы для компонента SearchInput
 * Расширяет стандартные атрибуты input
 */
export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Текст-заглушка в поле ввода
   */
  placeholder?: string
}

/**
 * Компонент поля ввода поиска
 * @param props пропсы компонента
 * @returns React компонент поля поиска
 */
const SearchInput: FC<SearchInputProps> = (props) => {
  const { placeholder = 'Введите название фильма...', className = '', ...restProps } = props

  /**
   * Обработчик изменения значения поля
   * Передаётся дальше через restProps
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (restProps.onChange) {
      restProps.onChange(event)
    }
  }

  return (
    <input
      type="text"
      className={`${styles.searchInput} ${className}`}
      placeholder={placeholder}
      onChange={handleChange}
      {...restProps}
    />
  )
}

export default SearchInput
