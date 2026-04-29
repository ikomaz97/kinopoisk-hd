// Button.tsx
/**
 * Универсальная кнопка.
 */
import React from 'react';
import styles from './Button.module.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Текст кнопки */
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...rest }) => (
  <button className={`${styles.button} ${className}`} {...rest}>
    {children}
  </button>
);

