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
          © 2026 Kinopoisk Demo · Data courtesy of TMDB.
        </p>
      </div>
    </footer>
  )
}

export default Footer

