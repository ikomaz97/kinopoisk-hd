// NotFoundPage.tsx
/**
 * Страница 404 – не найдено.
 */
import React from 'react';
import styles from './NotFoundPage.module.css';

export const NotFoundPage: React.FC = () => (
  <section className={styles.notFoundPage}>
    <h1>404 – Страница не найдена</h1>
    <p>К сожалению, запрашиваемая страница не существует.</p>
  </section>
);

