// Header.tsx
/**
 * Шапка сайта, содержит логотип и навигацию.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header: React.FC = () => (
  <header className={styles.header}>
    <Link to="/" className={styles.logo}>Kinopoisk HD</Link>
    {/* Добавьте навигационные ссылки при необходимости */}
  </header>
);

