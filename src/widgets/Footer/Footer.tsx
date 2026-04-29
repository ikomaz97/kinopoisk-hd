/**
 * Footer компонент
 * Отображается внизу всех страниц
 */

import type { FC } from 'react'
import styles from './Footer.module.css'

/**
 * Footer компонент
 * @returns React компонент Footer
 */
const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          © {new Date().getFullYear()} Kinopoisk HD. Данные предоставлены TMDB.
        </p>
      </div>
    </footer>
  )
}

export default Footer

