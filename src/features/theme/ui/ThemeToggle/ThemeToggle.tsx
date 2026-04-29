// ThemeToggle.tsx
/**
 * Кнопка переключения светлой/тёмной темы.
 */
import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { toggleTheme } from '@/features/theme/model/themeSlice';
import styles from './ThemeToggle.module.css';

export const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(state => state.theme.mode);

  const handleClick = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <button className={styles.toggle} onClick={handleClick} aria-label="Переключить тему">
      {mode === 'light' ? '🌞' : '🌙'}
    </button>
  );
};
