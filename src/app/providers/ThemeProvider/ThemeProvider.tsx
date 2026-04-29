// ThemeProvider.tsx
/**
 * Провайдер темы, переключает светлую/тёмную тему.
 */
import React, { type ReactNode, useEffect } from 'react';
import { useAppSelector } from '@/shared/hooks';
import styles from './ThemeProvider.module.css';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useAppSelector(state => state.theme.mode);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return <div className={styles.themeProvider}>{children}</div>;
};
