/**
 * Универсальная кнопка UI
 * Реализована согласно рекомендациям проекта (CSS Modules, абсолютные импорты)
 */

import type { FC, ReactNode } from 'react';
import styles from './Button.module.css';

/** Пропсы кнопки */
interface ButtonProps {
  /** Содержимое кнопки */
  children: ReactNode;
  /** Вариант стиля */
  variant?: 'primary' | 'secondary';
  /** Обработчик клика */
  onClick?: () => void;
  /** Отключена ли кнопка */
  disabled?: boolean;
  /** Дополнительный CSS‑класс */
  className?: string;
}

/**
 * Компонент Button
 * @param props Пропсы компонента
 */
const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

