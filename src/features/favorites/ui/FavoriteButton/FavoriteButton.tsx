/**
 * Кнопка добавления в избранное
 * Отображает сердечко, которое меняет состояние при клике
 */

import type { FC } from 'react'
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
   * Дополнительные CSS классы
   */
  className?: string
}

/**
 * Кнопка добавления в избранное
 * @param movieId ID фильма
 * @param className дополнительные классы
 * @returns React компонент FavoriteButton
 */
const FavoriteButton: FC<FavoriteButtonProps> = ({ movieId, className = '' }) => {
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.favorites.items)
  const isFavorite = favorites.some((item) => item.id === movieId)

  const handleClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movieId))
    } else {
      dispatch(addToFavorites({
        id: movieId,
        title: 'Фильм',
        poster_path: null,
        vote_average: 0,
      }))
    }
  }

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
