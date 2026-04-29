// App.tsx
/**
 * Корневой компонент приложения.
 * Оборачивает приложение провайдерами и роутером.
 */
import React from 'react';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { RouterProvider } from '@/app/providers/RouterProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { AppRouter } from '@/app/routes/AppRouter';
import styles from './App.module.css';

export const App: React.FC = () => (
  <StoreProvider>
    <RouterProvider>
      <ThemeProvider>
        <div className={styles.app}>
          <AppRouter />
        </div>
      </ThemeProvider>
    </RouterProvider>
  </StoreProvider>
);

