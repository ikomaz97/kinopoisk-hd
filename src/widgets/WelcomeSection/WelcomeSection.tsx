/**
 * Виджет Welcome Section
 * Отображает приветственную секцию с фоновым изображением популярного фильма и поиском
 */

import type { FC, FormEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetPopularMoviesQuery } from '@/entities/movie/api'
import { getBackdropUrl } from '@/shared/lib/image'
import styles from './WelcomeSection.module.css'

/**
 * Пропсы для компонента WelcomeSection
 */
interface WelcomeSectionProps {
  /**
   * Обработчик отправки формы поиска (не используется, так как навигация происходит внутри компонента)
   */
  _onSearch?: (query: string) => void
}

/**
 * Приветственная секция с фоновым изображением и поиском
 * @returns React компонент WelcomeSection
 */
const WelcomeSection: FC<WelcomeSectionProps> = () => {
  const navigate = useNavigate()

  // Получение популярных фильмов для фонового изображения
  const { data: popularMovies, isLoading } = useGetPopularMoviesQuery(1)

  // Выбор случайного фильма для фона при загрузке
  // Используем lazy initialization для избежания проблем с чистотой render
  const [randomBackdropUrl] = useState<string | null>(() => {
    if (popularMovies?.movies.length) {
      const randomMovie = popularMovies.movies[Math.floor(Math.random() * popularMovies.movies.length)]
      return randomMovie ? getBackdropUrl(randomMovie.backdrop_path, 'w1280') : null
    }
    return null
  })

  /**
   * Обработчик отправки формы поиска
   * @param event событие отправки формы
   */
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const query = formData.get('search') as string
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}&page=1`)
    }
  }

  return (
    <div className={styles.container}>
      {/* Фоновое изображение */}
      {randomBackdropUrl && (
        <div
          className={styles.background}
          style={{ backgroundImage: `url(${randomBackdropUrl})` }}
          aria-hidden="true"
        />
      )}

      {/* Затемнение фона */}
      <div className={styles.overlay} />

      {/* Контент секции */}
      <div className={styles.content}>
        <h1 className={styles.title}>Добро пожаловать в Кинопоиск HD</h1>
        <p className={styles.subtitle}>Найдите свой любимый фильм или откройте что-то новое</p>

        {/* Форма поиска */}
        <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            name="search"
            className={styles.searchInput}
            placeholder="Введите название фильма..."
            autoComplete="off"
          />
          <button
            type="submit"
            className={`${styles.button} ${styles.primary}`}
            disabled={!randomBackdropUrl && !isLoading}
          >
            Поиск
          </button>
        </form>
      </div>
    </div>
  )
}

export default WelcomeSection
