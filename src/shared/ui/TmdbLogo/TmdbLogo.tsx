/**
 * Компонент логотипа TMDB
 * Отображает логотип The Movie Database с автоматическим переключением цветов
 * в зависимости от текущей темы приложения (светлая/тёмная)
 */

import type { FC } from 'react'
import styles from './TmdbLogo.module.css'

/**
 * Интерфейс пропсов компонента
 */
interface TmdbLogoProps {
  /**
   * Дополнительный CSS-класс для внешнего стилирования
   */
  className?: string
}

/**
 * Компонент логотипа TMDB с динамическими цветами
 * @param props пропсы компонента
 * @returns React компонент логотипа
 */
export const TmdbLogo: FC<TmdbLogoProps> = ({ className }) => {
  return (
    <svg
      className={`${styles.logo} ${className || ''}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 273.42 223.5168"
      width="156"
      height="156"
      aria-label="TMDB - The Movie Database"
    >
      {/* Фон логотипа - цвет меняется в зависимости от темы */}
      <rect width="273.42" height="279.396" className={styles.bg} />

      {/* Основной текст TMDB - цвет меняется в зависимости от темы */}
      <text
        x="136.71"
        y="200"
        className={styles.mainText}
        fontFamily="Arial, sans-serif"
        fontSize="80"
        fontWeight="bold"
        textAnchor="middle"
      >
        TMDB
      </text>

      {/* Подзаголовок - цвет фиксированный (голубой) */}
      <text
        x="136.71"
        y="240"
        className={styles.subtitle}
        fontFamily="Arial, sans-serif"
        fontSize="24"
        textAnchor="middle"
      >
        The Movie Database
      </text>
    </svg>
  )
}
