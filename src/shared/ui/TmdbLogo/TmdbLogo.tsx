/**
 * Компонент логотипа TMDB
 * Отображает новый логотип The Movie Database с градиентом от светло-зелёного к бирюзовому
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
 * Компонент логотипа TMDB с новым дизайном
 * @param props пропсы компонента
 * @returns React компонент логотипа
 */
export const TmdbLogo: FC<TmdbLogoProps> = ({ className }) => {
  return (
    <svg
      className={`${styles.logo} ${className || ''}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 80"
      width="156"
      height="39"
      aria-label="TMDB - The Movie Database"
    >
      {/* Текст TMDB с градиентом */}
      <defs>
        <linearGradient id="tmdbGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#A8E6CF', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#56CCF2', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      <text
        x="0"
        y="60"
        className={styles.mainText}
        fontFamily="Arial, sans-serif"
        fontSize="55"
        fontWeight="bold"
        fill="url(#tmdbGradient)"
      >
        TMDB
      </text>
      
      {/* Бирюзовый овальный элемент */}
      <ellipse
        cx="245"
        cy="40"
        rx="45"
        ry="30"
        className={styles.circle}
      />
    </svg>
  )
}
