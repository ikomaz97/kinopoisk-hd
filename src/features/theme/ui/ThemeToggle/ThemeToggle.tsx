/**
 * Компонент кнопки переключения темы
 * Позволяет переключаться между темной и светлой темами
 */

import type { FC, ButtonHTMLAttributes } from 'react'
import { useTheme } from '@/features/theme'
import styles from './ThemeToggle.module.css'

/**
 * Пропсы для компонента ThemeToggle
 */
interface ThemeToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Дополнительный CSS класс
   */
  className?: string
}

/**
 * Компонент кнопки переключения темы
 * Отображает иконку луны (для светлой темы) или солнца (для темной темы)
 * @param className дополнительные CSS классы
 * @param props остальные пропсы кнопки
 * @returns React компонент кнопки переключения темы
 */
const ThemeToggle: FC<ThemeToggleProps> = ({ className = '', ...props }) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      className={`${styles.themeToggle} ${className}`}
      onClick={toggleTheme}
      aria-label={isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
      title={isDark ? 'Светлая тема' : 'Темная тема'}
      {...props}
    >
      {/* Иконка луны для светлой темы */}
      <span className={styles.icon}>
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  )
}

export default ThemeToggle

