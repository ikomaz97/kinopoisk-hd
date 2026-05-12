/**
 * Header компонент
 * Отображается на всех страницах приложения
 * Содержит логотип TMDB, основную навигацию и кнопку переключения темы
 */

import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import { ThemeToggle } from '@/features/theme/ui'
import { TmdbLogo } from '@/shared/ui'
import { memo, useCallback } from 'react'
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
  const handleLogoClick = useCallback(() => {
    navigate(ROUTES.MAIN)
  }, [navigate])

  const handleNavigate = useCallback((path: string) => {
    navigate(path)
  }, [navigate])

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип TMDB */}
        <button
          className={styles.logo}
          onClick={handleLogoClick}
          aria-label="Вернуться на главную страницу"
        >
          <TmdbLogo className={styles.logoImg} />
        </button>

        {/* Навигация */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {/* Main - Главная страница */}
            <li>
              <button className={styles.navLink} onClick={() => handleNavigate(ROUTES.MAIN)}>
                Главная
              </button>
            </li>

            {/* Category Movies - Категории фильмов */}
            <li>
              <button className={styles.navLink} onClick={() => handleNavigate(ROUTES.CATEGORY)}>
                Категории
              </button>
            </li>

            {/* Filtered Movies - Фильтрация фильмов */}
            <li>
              <button className={styles.navLink} onClick={() => handleNavigate(ROUTES.FILTERED)}>
                Фильтр
              </button>
            </li>

            {/* Search - Поиск фильмов */}
            <li>
              <button className={styles.navLink} onClick={() => handleNavigate(ROUTES.SEARCH)}>
                Поиск
              </button>
            </li>

            {/* Favorites - Избранные фильмы */}
            <li>
              <button className={styles.navLink} onClick={() => handleNavigate(ROUTES.FAVORITES)}>
                Избранное
              </button>
            </li>
          </ul>
        </nav>

        {/* Кнопка переключения темы */}
        <ThemeToggle className={styles.themeToggle} />
      </div>
    </header>
  )
}

export default memo(Header)
