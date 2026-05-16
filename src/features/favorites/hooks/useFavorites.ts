/**
 * Хук для работы с избранными фильмами
 * Предоставляет функции добавления, удаления и проверки избранного
 */

import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@/app/providers/StoreProvider'
import { addToFavorites, removeFromFavorites } from '@/features/favorites/model/favoritesSlice'

/**
 * Интерфейс фильма для избранного
 */
export interface FavoriteMovieInput {
  id: number
  title: string
  posterPath: string | null
  voteAverage: number
}

/**
 * Хук для управления избранными фильмами
 * @returns объект с функциями и состоянием избранного
 */
export const useFavorites = () => {
  const dispatch = useDispatch<AppDispatch>()
  const favorites = useSelector((state: RootState) => state.favorites.items)

  /**
   * Проверка, находится ли фильм в избранном
   * @param movieId ID фильма
   * @returns true если фильм в избранном
   */
  const isFavorite = useCallback(
    (movieId: number) => favorites.some((item) => item.id === movieId),
    [favorites]
  )

  /**
   * Добавить фильм в избранное
   * @param movie данные фильма
   */
  const addFavorite = useCallback(
    (movie: FavoriteMovieInput) => {
      dispatch(
        addToFavorites({
          id: movie.id,
          title: movie.title,
          poster_path: movie.posterPath,
          vote_average: movie.voteAverage,
        })
      )
    },
    [dispatch]
  )

  /**
   * Удалить фильм из избранного
   * @param movieId ID фильма
   */
  const removeFavorite = useCallback(
    (movieId: number) => {
      dispatch(removeFromFavorites(movieId))
    },
    [dispatch]
  )

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
  }
}

export default useFavorites
