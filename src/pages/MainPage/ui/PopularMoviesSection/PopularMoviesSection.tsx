/**
 * Popular Movies Section компонент
 * Отображает 6 популярных фильмов и кнопку для просмотра всех
 */

import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Movie } from '@/entities/movie'
import { MovieList } from '@/widgets/MovieList'
import { ROUTES } from '@/shared/constants/routes'
import styles from './PopularMoviesSection.module.css'

/**
 * Props для PopularMoviesSection
 */
interface PopularMoviesSectionProps {
  movies: Movie[] | undefined
  isLoading: boolean
}

/**
 * Popular Movies Section - секция популярных фильмов
 * @param movies массив популярных фильмов (будет показано первые 6)
 * @param isLoading статус загрузки
 * @returns React компонент секции популярных фильмов
 */
const PopularMoviesSection: FC<PopularMoviesSectionProps> = ({ movies, isLoading }) => {
  const navigate = useNavigate()

  /**
   * Обработчик клика по кнопке "View More"
   * Переводит на страницу категории с популярными фильмами
   */
  const handleViewMore = () => {
    navigate(`${ROUTES.CATEGORY}/popular`)
  }

  // Получаем только первые 6 фильмов для отображения в секции
  const displayMovies = movies?.slice(0, 6)

  return (
    <section className={styles.section}>
      {/* Заголовок секции */}
      <div className={styles.header}>
        <h2 className={styles.title}>Popular Movies</h2>
      </div>

      {/* Список фильмов */}
      {isLoading ? (
        <div className={styles.loading}>Загрузка...</div>
      ) : displayMovies && displayMovies.length > 0 ? (
        <>
          <MovieList movies={displayMovies} />

          {/* Кнопка просмотра всех фильмов */}
          <div className={styles.footer}>
            <button className={styles.viewMoreButton} onClick={handleViewMore}>
              View More
            </button>
          </div>
        </>
      ) : (
        <p className={styles.error}>Не удалось загрузить популярные фильмы</p>
      )}
    </section>
  )
}

export default PopularMoviesSection

