/**
 * Страница избранных фильмов
 * Отображает фильмы, добавленные пользователем в избранное
 */

import type { FC } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/app'
import type { Movie } from '@/entities/movie'
import { MovieList } from '@/widgets/MovieList'
import { Loader } from '@/shared/ui/Loader'
import styles from './FavoritesPage.module.css'

/**
 * Страница избранных фильмов
 * @returns React компонент страницы избранных
 */
const FavoritesPage: FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items)
  const isLoading = useSelector((state: RootState) => state.favorites.isLoading)
  const error = useSelector((state: RootState) => state.favorites.error)

  // Преобразуем избранные фильмы в формат Movie для MovieList
  const movies: Movie[] = favorites.map((favorite) => ({
    id: favorite.id,
    title: favorite.title,
    overview: '',
    poster_path: favorite.poster_path,
    backdrop_path: null,
    release_date: '',
    vote_average: favorite.vote_average,
    popularity: 0,
    genre_ids: [],
  }))

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Избранные фильмы</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className={styles.errorMessage}>Ошибка: {error}</p>
      ) : movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p className={styles.emptyMessage}>
          У вас пока нет избранных фильмов. Добавьте фильмы в избранное, нажав на ❤️ в карточке фильма.
        </p>
      )}
    </div>
  )
}

export default FavoritesPage
