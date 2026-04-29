/**
 * Страница деталей фильма
 * Отображает подробную информацию о фильме
 */

import type { FC } from 'react'
import { useParams } from 'react-router-dom'
import styles from './MovieDetailsPage.module.css'

/**
 * Страница деталей фильма
 * @returns React компонент страницы деталей фильма
 */
const MovieDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Детали фильма</h1>
      <p className={styles.comingSoon}>
        Страница в разработке. Здесь будет отображаться подробная информация о фильме с ID: {id}
      </p>
    </div>
  )
}

export default MovieDetailsPage

