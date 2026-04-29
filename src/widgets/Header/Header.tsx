/**
 * Header компонент
 * Отображается на всех страницах приложения
 * Содержит логотип TMDB и навигацию
 */

import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

/**
 * Header компонент с логотипом и навигацией
 * @returns React компонент Header
 */
const Header: FC = () => {
  const navigate = useNavigate()

  /**
   * Обработчик клика по логотипу
   * Навигирует на главную страницу
   */
  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип TMDB */}
        <button
          className={styles.logo}
          onClick={handleLogoClick}
          aria-label="Вернуться на главную страницу"
        >
          <span className={styles.logoIcon}>🎬</span>
          <span className={styles.logoText}>TMDB</span>
        </button>

        {/* Навигация */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <button className={styles.navLink} onClick={() => navigate('/')}>
                Главная
              </button>
            </li>
            <li>
              <button className={styles.navLink} onClick={() => navigate('/category/popular')}>
                Популярные
              </button>
            </li>
            <li>
              <button className={styles.navLink} onClick={() => navigate('/category/top_rated')}>
                Лучшие
              </button>
            </li>
            <li>
              <button className={styles.navLink} onClick={() => navigate('/search')}>
                Поиск
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

