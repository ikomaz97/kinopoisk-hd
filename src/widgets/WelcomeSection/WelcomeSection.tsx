/**
 * Виджет Welcome Section
 * Отображает приветственную секцию с фоновым изображением популярного фильма и поиском
 */

import type { FC, ChangeEvent } from 'react'
import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBackdropUrl } from '@/shared/lib/image'
import { SearchInput } from '@/shared/ui/SearchInput'
import type { Movie } from '@/entities/movie'
import styles from './WelcomeSection.module.css'

/**
 * Пропсы для компонента WelcomeSection
 */
interface WelcomeSectionProps {
  /**
   * Список популярных фильмов для выбора случайного фонового изображения
   */
  popularMovies?: Movie[]
  /**
   * Флаг загрузки популярных фильмов
   */
  isLoading?: boolean
}

/**
 * Приветственная секция с фоновым изображением и поиском
 * @param popularMovies список популярных фильмов для фона
 * @param isLoading флаг загрузки данных
 * @returns React компонент WelcomeSection
 */
const WelcomeSection: FC<WelcomeSectionProps> = ({ popularMovies, isLoading }) => {
  const navigate = useNavigate()

  /**
   * Вычисляем случайный URL фонового изображения из списка популярных фильмов
   * Мемоизирован — пересчитывается только при изменении списка фильмов
   */
  const randomBackdropUrl = useMemo(() => {
    if (!popularMovies?.length) return null
    const randomIndex = Math.floor(Math.random() * popularMovies.length)
    const randomMovie = popularMovies[randomIndex]
    return randomMovie ? getBackdropUrl(randomMovie.backdrop_path, 'original') : null
  }, [popularMovies])

  // Состояние для отслеживания текста в поле поиска
  const [searchQuery, setSearchQuery] = useState<string>('')
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchSubmit: React.SubmitEventHandler<HTMLFormElement> = (event) => {
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
          <SearchInput
            name="search"
            className={styles.searchInput}
            placeholder="Введите название фильма..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            type="submit"
            className={`${styles.button} ${styles.primary}`}
            disabled={!searchQuery.trim() || (!randomBackdropUrl && !isLoading)}
          >
            Поиск
          </button>
        </form>
      </div>
    </div>
  )
}

export default WelcomeSection
