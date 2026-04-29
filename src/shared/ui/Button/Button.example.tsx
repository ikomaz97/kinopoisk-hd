/**
 * Пример: компонент Button с правильной структурой
 * Демонстрирует использование CSS модулей и абсолютных импортов
 */

import type { FC, ReactNode } from 'react'
import styles from './Button.module.css'

/**
 * Пропсы компонента Button
 */
interface ButtonProps {
  /** Внутреннее содержимое кнопки */
  children: ReactNode
  /** Тип кнопки */
  variant?: 'primary' | 'secondary'
  /** Обработчик клика */
  onClick?: () => void
  /** Отключена ли кнопка */
  disabled?: boolean
}

/**
 * Универсальная кнопка
 * @param props - пропсы компонента
 * @returns React компонент
 */
const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button


