// Loader.tsx
/**
 * Индикатор загрузки (спиннер).
 */
import React from 'react';
import styles from './Loader.module.css';

export const Loader: React.FC = () => (
  <div className={styles.loader} role="status" aria-label="Загрузка" />
);

