/**
 * Компонент пагинации для навигации по страницам
 * Отображает список номеров страниц с умным обрезанием
 * Мемоизирован для оптимизации перерисовок
 */

import type { FC } from 'react'
import { useCallback, memo, useMemo } from 'react'
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
  /**
   * Количество соседних страниц для отображения вокруг текущей
   * @default 1
   */
  siblingCount?: number
}

/**
 * Компонент пагинации
 * Отображает список номеров страниц с интеллектуальным обрезанием:
 * - Первая страница всегда видна
 * - Многоточие перед диапазоном вокруг текущей страницы
 * - Текущая страница + соседние страницы
 * - Многоточие перед последней страницей
 * - Последняя страница всегда видна
 * Мемоизирован для предотвращения ненужных перерисовок
 * @param currentPage текущая страница
 * @param totalPages всего страниц
 * @param onPageChange колбэк при смене страницы
 * @param siblingCount количество соседних страниц (по умолчанию 1)
 * @returns React компонент Pagination
 */
const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  /**
   * Вычисление списка видимых номеров страниц
   * Логика: [1, ..., 7, 8, 9, ..., totalPages]
   */
  const pageNumbers = useMemo(() => {
    const pages: (number | 'ellipsis')[] = []

    // Первая страница всегда видна
    pages.push(1)

    // Если страниц больше чем 1 + 2*siblingCount + 1, добавляем многоточие
    if (totalPages > 2 * siblingCount + 3) {
      // Страницы вокруг текущей
      const start = Math.max(2, currentPage - siblingCount)
      const end = Math.min(totalPages - 1, currentPage + siblingCount)

      // Многоточие перед диапазоном, если есть разрыв
      if (start > 2) {
        pages.push('ellipsis')
      }

      // Соседние страницы
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Многоточие перед последней страницей, если есть разрыв
      if (end < totalPages - 1) {
        pages.push('ellipsis')
      }
    } else {
      // Если страниц мало, показываем все от 2 до totalPages-1
      for (let i = 2; i < totalPages; i++) {
        pages.push(i)
      }
    }

    // Последняя страница всегда видна (если больше 1 страницы)
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }, [currentPage, totalPages, siblingCount])

  /**
   * Обработчик клика на номер страницы
   */
  const handlePageClick = useCallback(
    (page: number) => {
      if (page !== currentPage && page >= 1 && page <= totalPages) {
        onPageChange(page)
      }
    },
    [currentPage, totalPages, onPageChange]
  )

  return (
    <div className={styles.pagination}>
      {pageNumbers.map((page, index) => {
        // Обработка многоточия
        if (page === 'ellipsis') {
          return <span key={`ellipsis-${index}`} className={styles.ellipsis}>...</span>
        }

        // Обработка номера страницы
        const isActive = page === currentPage
        return (
          <button
            key={page}
            className={`${styles.pageButton} ${isActive ? styles.active : ''}`}
            onClick={() => handlePageClick(page)}
            disabled={isActive}
            aria-label={`Страница ${page}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {page}
          </button>
        )
      })}
    </div>
  )
}

export default memo(Pagination)
