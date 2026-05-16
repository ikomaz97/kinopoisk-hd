/**
 * Компонент секции фильмов с заголовком, списком и кнопкой "Смотреть все"
 * Используется на главной странице для каждой категории фильмов
 */

import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Movie } from '@/entities/movie'
import { MovieList } from '@/widgets/MovieList'
import { Skeleton } from '@/shared/ui/Skeleton'
import styles from './MovieSection.module.css'

/**
 * Пропсы компонента MovieSection
 */
interface MovieSectionProps {
  /** Заголовок секции */
  title: string
  /** Массив фильмов (будут показаны первые 6) */
  movies: Movie[] | undefined
  /** Статус загрузки */
  isLoading: boolean
  /** Маршрут для кнопки "Смотреть все" */
  categoryPath: string
}

/**
 * Секция фильмов с заголовком, 6 карточками и кнопкой перехода на полный список
 * @param title заголовок секции
 * @param movies массив фильмов
 * @param isLoading статус загрузки
 * @param categoryPath маршрут для кнопки
 * @returns React компонент секции фильмов
 */
const MovieSection: FC<MovieSectionProps> = ({ title, movies, isLoading, categoryPath }) => {
  const navigate = useNavigate()

  /** Обработчик клика по кнопке "Смотреть все" */
  const handleViewMore = () => {
    navigate(categoryPath)
  }

  // Показываем только первые 6 фильмов
  const displayMovies = movies?.slice(0, 6)

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button className={styles.viewMoreButton} onClick={handleViewMore}>
          Смотреть все
        </button>
      </div>

      {isLoading ? (
        <div className={styles.skeletonGrid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" />
          ))}
        </div>
      ) : displayMovies && displayMovies.length > 0 ? (
        <MovieList movies={displayMovies} />
      ) : (
        <p className={styles.error}>Не удалось загрузить {title.toLowerCase()}</p>
      )}
    </section>
  )
}

export default MovieSection

