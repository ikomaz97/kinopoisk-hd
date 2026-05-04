/**
 * Компонент Badge
 * Отображает цветной бейдж с текстом
 */

import type { FC } from 'react'
import styles from './Badge.module.css'

/**
 * Пропсы для компонента Badge
 */
export interface BadgeProps {
  /**
   * Текст бейджа
   */
  children: React.ReactNode
  /**
   * Вариант цвета (green, yellow, red)
   */
  variant?: 'green' | 'yellow' | 'red'
  /**
   * Дополнительные CSS классы
   */
  className?: string
}

/**
 * Компонент Badge
 * @param children текст бейджа
 * @param variant вариант цвета
 * @param className дополнительные классы
 * @returns React компонент Badge
 */
const Badge: FC<BadgeProps> = ({ children, variant = 'green', className = '' }) => {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
