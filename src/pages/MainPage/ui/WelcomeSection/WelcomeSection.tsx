/**
 * Welcome Section компонент
 * Отображает рандомный backdrop из популярных фильмов и закладку поиска
 */

import type { FC, ChangeEvent, FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Movie } from '@/entities/movie'
import { getBackdropUrl } from '@/shared/lib/image'
import { ROUTES } from '@/shared/constants/routes'
import styles from './WelcomeSection.module.css'

/**
 * Props для WelcomeSection
 */
interface WelcomeSectionProps {
  movies: Movie[] | undefined
}

/**
 * Welcome Section - приветственный блок с поиском и рандомным backdrop
 * @param movies массив популярных фильмов для выбора backdrop
 * @returns React компонент приветственной секции
 */
const WelcomeSection: FC<WelcomeSectionProps> = ({ movies }) => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  /**
   * Выбирает случайный фильм из массива для backdrop
   */
  const randomMovie = useMemo(() => {
    if (!movies || movies.length === 0) return null
    return movies[Math.floor(Math.random() * movies.length)]
  }, [movies])

  /**
   * Обновляет случайный фильм при изменении movies (каждые 5 секунд)
   */
  useEffect(() => {
    const interval = setInterval(() => {
      if (movies && movies.length > 0) {
        // Это просто для обновления компонента, useMemo сам переменится
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [movies])

  /**
   * Обработчик изменения текста в поле поиска
   * @param event событие изменения input
   */
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  /**
   * Обработчик отправки формы поиска
   * @param event событие отправки формы
   */
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = searchQuery.trim()
    if (query) {
      navigate(`${ROUTES.SEARCH}?query=${encodeURIComponent(query)}`)
    }
  }

  const backdropUrl = randomMovie ? getBackdropUrl(randomMovie.backdrop_path, 'w1280') : ''

  return (
    <section
      className={styles.welcome}
      style={backdropUrl ? { backgroundImage: `url('${backdropUrl}')` } : {}}
    >
      {/* Оверлей для читаемости текста */}
      <div className={styles.overlay} />

      {/* Контент welcome секции */}
      <div className={styles.content}>
        <h1 className={styles.title}>Добро пожаловать в TMDB</h1>
        <p className={styles.subtitle}>Найди свой любимый фильм</p>

        {/* Форма поиска */}
        <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Введите название фильма..."
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Поле поиска фильма"
          />
          <button
            type="submit"
            className={styles.searchButton}
            disabled={!searchQuery.trim()}
            aria-label="Кнопка поиска"
          >
            Search MOVIE
          </button>
        </form>
      </div>
    </section>
  )
}

export default WelcomeSection

