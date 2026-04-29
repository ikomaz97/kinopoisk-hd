/**
 * Страница NotFound (404)
 * Отображается при переходе на несуществующий маршрут
 */

import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import styles from './NotFoundPage.module.css'

/**
 * Страница 404 - не найдено
 * @returns React компонент страницы NotFound
 */
const NotFoundPage: FC = () => {
  const navigate = useNavigate()

  /**
   * Обработчик клика по кнопке "На главную"
   */
  const handleGoHome = () => {
    navigate(ROUTES.MAIN)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.errorMessage}>Страница не найдена</p>
      <button className={styles.backButton} onClick={handleGoHome}>
        Вернуться на главную
      </button>
    </div>
  )
}

export default NotFoundPage

