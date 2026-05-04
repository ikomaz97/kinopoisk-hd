/**
 * Страница деталей фильма
 * Отображает подробную информацию о фильме
 */

import type { FC } from 'react'
import { useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetMovieDetailsQuery } from '@/entities/movie/api'
import { getBackdropUrl, getProfileUrl, getPosterUrl } from '@/shared/lib/image'
import { Badge } from '@/shared/ui/Badge'
import { Loader } from '@/shared/ui/Loader'
import { FavoriteButton } from '@/features/favorites/ui'
import { SimilarMoviesList } from '@/widgets/SimilarMoviesList'
import styles from './MovieDetailsPage.module.css'

/**
 * Страница деталей фильма
 * @returns React компонент страницы деталей фильма
 */
const MovieDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>()

  const navigate = useNavigate()

  // Загружаем детали фильма
  const { data: movie, isLoading, error } = useGetMovieDetailsQuery(Number(id), {
    skip: !id,
  })

  /**
   * Обработчик клика на кнопку назад
   */
  const handleBackClick = useCallback(() => {
    navigate(-1)
  }, [navigate])

  /**
   * Форматирует дату выпуска
   */
  const formatDate = (dateString: string): string => {
    if (!dateString) return 'Неизвестно'
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  /**
   * Форматирует длительность фильма
   */
  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours} ч. ${mins} мин.`
    }
    return `${mins} мин.`
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className={styles.container}>
        <button onClick={handleBackClick} className={styles.backButton}>
          ← Назад
        </button>
        <p className={styles.error}>
          Не удалось загрузить информацию о фильме
        </p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* Кнопка назад */}
      <button onClick={handleBackClick} className={styles.backButton}>
        ← Назад
      </button>

      {/* Главный контент */}
      <div className={styles.content}>
        {/* Постер фильма */}
        <div className={styles.posterSection}>
          <img
            src={getBackdropUrl(movie.backdrop_path)}
            alt={movie.title}
            className={styles.backdrop}
          />
          <div className={styles.posterOverlay}>
            <img
              src={getPosterUrl(movie.poster_path)}
              alt={movie.title}
              className={styles.poster}
            />
          </div>
        </div>

        {/* Информация о фильме */}
        <div className={styles.infoSection}>
          {/* Заголовок и кнопка избранного */}
          <div className={styles.header}>
            <h1 className={styles.title}>{movie.title}</h1>
            <FavoriteButton
              movieId={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              voteAverage={movie.vote_average}
              className={styles.favoriteButton}
            />
          </div>

          {/* Рейтинг и метаданные */}
          <div className={styles.metadata}>
            <Badge variant={movie.vote_average >= 8 ? 'green' : movie.vote_average >= 6 ? 'yellow' : 'red'}>
              ⭐ {movie.vote_average.toFixed(1)}
            </Badge>
            <span className={styles.voteCount}>({movie.vote_count.toLocaleString()} оценок)</span>
            {movie.release_date && (
              <span className={styles.releaseDate}>{formatDate(movie.release_date)}</span>
            )}
            {movie.runtime > 0 && (
              <span className={styles.runtime}>{formatRuntime(movie.runtime)}</span>
            )}
          </div>

          {/* Жанры */}
          {movie.genres && movie.genres.length > 0 && (
            <div className={styles.genres}>
              {movie.genres.map((genre: { id: number; name: string }) => (
                <Badge key={genre.id} variant="yellow" className={styles.genreBadge}>
                  {genre.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Описание */}
          {movie.overview && (
            <div className={styles.overview}>
              <h2 className={styles.sectionTitle}>Описание</h2>
              <p>{movie.overview}</p>
            </div>
          )}

          {/* Страны производства */}
          {movie.production_countries && movie.production_countries.length > 0 && (
            <div className={styles.infoRow}>
              <h2 className={styles.sectionTitle}>Страны</h2>
              <div className={styles.countries}>
                {movie.production_countries.map((country: { iso_3166_1: string; name: string }) => (
                  <span key={country.iso_3166_1} className={styles.country}>
                    {country.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Языки */}
          {movie.spoken_languages && movie.spoken_languages.length > 0 && (
            <div className={styles.infoRow}>
              <h2 className={styles.sectionTitle}>Языки</h2>
              <div className={styles.languages}>
                {movie.spoken_languages.map((lang: { iso_639_1: string; name: string }) => (
                  <span key={lang.iso_639_1} className={styles.language}>
                    {lang.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Актеры */}
          {movie.credits && movie.credits.cast && movie.credits.cast.length > 0 && (
            <div className={styles.infoRow}>
              <h2 className={styles.sectionTitle}>В главных ролях</h2>
              <div className={styles.cast}>
                {movie.credits.cast.slice(0, 6).map((actor: { id: number; name: string; character: string; profile_path: string | null }) => (
                  <div key={actor.id} className={styles.actor}>
                    <img
                      src={getProfileUrl(actor.profile_path)}
                      alt={actor.name}
                      className={styles.actorPhoto}
                    />
                    <div className={styles.actorInfo}>
                      <span className={styles.actorName}>{actor.name}</span>
                      <span className={styles.actorCharacter}>{actor.character}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Режиссёр */}
          {movie.credits && movie.credits.crew && movie.credits.crew.length > 0 && (
            <div className={styles.infoRow}>
              <h2 className={styles.sectionTitle}>Режиссёр</h2>
              <div className={styles.crew}>
                {movie.credits.crew
                  .filter((person: { job: string; name: string; profile_path: string | null }) => person.job === 'Director')
                  .map((director: { id: number; name: string; profile_path: string | null }) => (
                    <div key={director.id} className={styles.director}>
                      {director.profile_path ? (
                        <img
                          src={getProfileUrl(director.profile_path)}
                          alt={director.name}
                          className={styles.directorPhoto}
                        />
                      ) : null}
                      <span className={styles.directorName}>{director.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Список похожих фильмов */}
        <div className={styles.similarMoviesSection}>
          <h2 className={styles.sectionTitle}>Похожие фильмы</h2>
          <SimilarMoviesList movieId={movie.id} />
        </div>
      </div>
    </div>
  )
}

export default MovieDetailsPage
