/**
 * Компонент ErrorFallback
 * Отображается при глобальной ошибке в приложении (error boundary)
 * Показывает сообщение об ошибке и кнопку для перезагрузки
 */

import type { FC } from 'react'
import styles from './ErrorFallback.module.css'

/**
 * Пропсы для компонента ErrorFallback
 */
export interface ErrorFallbackProps {
  /**
   * Объект ошибки
   */
  error?: Error
  /**
   * Функция для сброса ошибки
   */
  resetErrorBoundary?: () => void
}

/**
 * Компонент ErrorFallback — заглушка при критической ошибке
 * @param error объект ошибки
 * @param resetErrorBoundary функция сброса
 * @returns React компонент ErrorFallback
 */
const ErrorFallback: FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Что-то пошло не так</h1>
      <p className={styles.message}>
        Произошла непредвиденная ошибка. Пожалуйста, попробуйте перезагрузить страницу.
      </p>
      {error && (
        <details className={styles.details}>
          <summary>Подробнее об ошибке</summary>
          <pre className={styles.stack}>{error.message}</pre>
        </details>
      )}
      {resetErrorBoundary && (
        <button className={styles.retryButton} onClick={resetErrorBoundary}>
          Попробовать снова
        </button>
      )}
    </div>
  )
}

export default ErrorFallback
