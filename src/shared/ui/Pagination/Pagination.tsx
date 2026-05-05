/**
 * Компонент пагинации для навигации по страницам
 * Отображает кнопки Назад/Вперед и номер текущей страницы
 * Мемоизирован для оптимизации перерисовок
 */

import type { FC } from 'react'
import { useCallback, memo } from 'react'
import styles from './Pagination.module.css'

/**
 * Пропсы компонента Pagination
 */
interface PaginationProps {
  /**
   * Текущая страница
   */
  currentPage: number
  /**
   * Общее количество страниц
   */
  totalPages: number
  /**
   * Обработчик смены страницы
   */
  onPageChange: (page: number) => void
}

/**
 * Компонент пагинации
 * Отображает кнопки "Назад" и "Вперед" для навигации по страницам фильмов
 * Мемоизирован для предотвращения ненужных перерисовок
 * @param currentPage текущая страница
 * @param totalPages всего страниц
 * @param onPageChange колбэк при смене страницы
 * @returns React компонент Pagination
 */
const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  /**
   * Обработчик клика на предыдущую страницу
   */
  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }, [currentPage, onPageChange])

  /**
   * Обработчик клика на следующую страницу
   */
  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }, [currentPage, totalPages, onPageChange])

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        aria-label="Предыдущая страница"
      >
        ← Назад
      </button>

      <span className={styles.pageInfo}>
        Страница {currentPage} из {totalPages}
      </span>

      <button
        className={styles.button}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        aria-label="Следующая страница"
      >
        Вперед →
      </button>
    </div>
  )
}

export default memo(Pagination)

