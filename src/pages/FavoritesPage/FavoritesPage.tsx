/**
 * Страница избранных фильмов
 * Отображает фильмы, добавленные пользователем в избранное с пагинацией
 */

import type { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@/app'
import type { Movie } from '@/entities/movie'
import { MovieList } from '@/widgets/MovieList'
import { Pagination } from '@/shared/ui/Pagination'
import { Loader } from '@/shared/ui/Loader'
import { setCurrentPage } from '@/features/favorites'
import styles from './FavoritesPage.module.css'

/**
 * Страница избранных фильмов
 * @returns React компонент страницы избранных
 */
const FavoritesPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const favorites = useSelector((state: RootState) => state.favorites.items)
  const currentPage = useSelector((state: RootState) => state.favorites.currentPage)
  const itemsPerPage = useSelector((state: RootState) => state.favorites.itemsPerPage)
  const isLoading = useSelector((state: RootState) => state.favorites.isLoading)
  const error = useSelector((state: RootState) => state.favorites.error)

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(favorites.length / itemsPerPage)

  // Получаем текущую страницу фильмов
  const currentMovies = favorites.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Преобразуем избранные фильмы в формат Movie для MovieList
  const movies: Movie[] = currentMovies.map((favorite) => ({
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

  /**
   * Обработчик смены страницы
   * Обновляет текущую страницу в Redux-слайсе
   */
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page))
    window.scrollTo(0, 0)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Избранные фильмы</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className={styles.errorMessage}>Ошибка: {error}</p>
      ) : movies.length > 0 ? (
        <>
          <MovieList movies={movies} />
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </>
      ) : (
        <p className={styles.emptyMessage}>
          У вас пока нет избранных фильмов. Добавьте фильмы в избранное, нажав на ❤️ в карточке фильма.
        </p>
      )}
    </div>
  )
}

export default FavoritesPage
