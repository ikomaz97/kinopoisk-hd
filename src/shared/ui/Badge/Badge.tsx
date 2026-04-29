// Badge.tsx
/**
 * Компонент бейджа (например, для отображения рейтинга).
 */
import React from 'react';
import styles from './Badge.module.css';

type BadgeProps = {
  /** Текст внутри бейджа */
  children: React.ReactNode;
  /** Цветовая схема */
  variant?: 'primary' | 'secondary';
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary' }) => (
  <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>
);

