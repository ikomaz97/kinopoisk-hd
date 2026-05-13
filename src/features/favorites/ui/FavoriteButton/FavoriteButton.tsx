/**
 * Кнопка добавления в избранное
 * Отображает сердечко, которое меняет состояние при клике
 */

import type { FC } from 'react'
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/app/providers/StoreProvider'
import { removeFromFavorites, addToFavorites } from '@/features/favorites/model/favoritesSlice'
import styles from './FavoriteButton.module.css'

/**
 * Пропсы для компонента FavoriteButton
 */
export interface FavoriteButtonProps {
  /**
   * ID фильма
   */
  movieId: number
  /**
   * Название фильма (для добавления в избранное)
   */
  title?: string
  /**
   * Путь к постеру (для добавления в избранное)
   */
  posterPath?: string | null
  /**
   * Рейтинг фильма (для добавления в избранное)
   */
  voteAverage?: number
  /**
   * Дополнительные CSS классы
   */
  className?: string
}

/**
 * Кнопка добавления в избранное
 * @param movieId ID фильма
 * @param title название фильма
 * @param posterPath путь к постеру
 * @param voteAverage рейтинг фильма
 * @param className дополнительные классы
 * @returns React компонент FavoriteButton
 */
const FavoriteButton: FC<FavoriteButtonProps> = ({
  movieId,
  title = 'Фильм',
  posterPath = null,
  voteAverage = 0,
  className = ''
}) => {
  const dispatch = useDispatch()
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.items.some((item) => item.id === movieId)
  )

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFavorite) {
      dispatch(removeFromFavorites(movieId))
    } else {
      dispatch(addToFavorites({
        id: movieId,
        title,
        poster_path: posterPath,
        vote_average: voteAverage,
      }))
    }
  }, [isFavorite, movieId, title, posterPath, voteAverage, dispatch])

  return (
    <button
      className={`${styles.button} ${isFavorite ? styles.active : ''} ${className}`}
      onClick={handleClick}
      aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  )
}

export default FavoriteButton
