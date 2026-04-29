/**
 * Страница избранных фильмов
 * Отображает фильмы, добавленные пользователем в избранное
 */

import type { FC } from 'react'
import styles from './FavoritesPage.module.css'

/**
 * Страница избранных фильмов
 * @returns React компонент страницы избранных
 */
const FavoritesPage: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Избранные фильмы</h1>
      <p className={styles.emptyMessage}>
        Страница в разработке. Здесь будут отображаться ваши избранные фильмы.
      </p>
    </div>
  )
}

export default FavoritesPage

