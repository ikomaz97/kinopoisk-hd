// FavoriteButton.tsx
/**
 * Кнопка добавления/удаления фильма из избранного.
 */
import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { addFavorite, removeFavorite, selectFavoriteIds } from '@/features/favorites/model/favoritesSlice';
import styles from './FavoriteButton.module.css';

type FavoriteButtonProps = {
  /**
   * ID фильма.
   */
  movieId: number;
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector(selectFavoriteIds);
  const isFav = favoriteIds.includes(movieId);

  const toggle = useCallback(() => {
    if (isFav) {
      dispatch(removeFavorite(movieId));
    } else {
      dispatch(addFavorite(movieId));
    }
  }, [dispatch, isFav, movieId]);

  return (
    <button className={styles.button} onClick={toggle} aria-pressed={isFav}>
      {isFav ? '★ Удалить из избранного' : '☆ Добавить в избранное'}
    </button>
  );
};

