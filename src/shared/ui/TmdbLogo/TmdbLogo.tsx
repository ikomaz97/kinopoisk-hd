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
      viewBox="0 0 400 100"
      width="156"
      height="39"
      aria-label="TMDB - The Movie Database"
    >
      {/* Фон логотипа - цвет меняется в зависимости от темы */}
      <rect width="400" height="100" className={styles.bg} />

      {/* Текст THE */}
      <text
        x="0"
        y="70"
        className={styles.mainText}
        fontFamily="Arial, sans-serif"
        fontSize="60"
        fontWeight="bold"
        textAnchor="start"
      >
        THE
      </text>

      {/* Текст M */}
      <text
        x="110"
        y="70"
        className={styles.mainText}
        fontFamily="Arial, sans-serif"
        fontSize="60"
        fontWeight="bold"
        textAnchor="start"
      >
        M
      </text>

      {/* Голубой круг вместо O */}
      <circle
        cx="165"
        cy="60"
        r="15"
        className={styles.circle}
      />

      {/* Текст VIE DB */}
      <text
        x="185"
        y="70"
        className={styles.mainText}
        fontFamily="Arial, sans-serif"
        fontSize="60"
        fontWeight="bold"
        textAnchor="start"
      >
        VIE DB
      </text>
    </svg>
  )
}
