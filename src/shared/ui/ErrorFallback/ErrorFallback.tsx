// ErrorFallback.tsx
/**
 * Компонент fallback для Error Boundary.
 */
import React from 'react';
import styles from './ErrorFallback.module.css';

type ErrorFallbackProps = {
  /** Текст ошибки */
  error: Error;
  /** Функция сброса */
  resetErrorBoundary: () => void;
};

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => (
  <div className={styles.errorFallback} role="alert">
    <p>Что‑то пошло не так:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary} className={styles.button}>Попробовать снова</button>
  </div>
);

