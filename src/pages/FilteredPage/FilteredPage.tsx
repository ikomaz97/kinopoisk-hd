/**
 * Страница фильтрации и сортировки фильмов
 * Позволяет фильтровать фильмы по различным параметрам
 */

import type { FC } from 'react'
import styles from './FilteredPage.module.css'

/**
 * Страница фильтрации фильмов
 * @returns React компонент страницы фильтрации
 */
const FilteredPage: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Фильтрация фильмов</h1>
      <p className={styles.comingSoon}>
        Страница в разработке. Скоро здесь появится функционал фильтрации и сортировки фильмов.
      </p>
    </div>
  )
}

export default FilteredPage

