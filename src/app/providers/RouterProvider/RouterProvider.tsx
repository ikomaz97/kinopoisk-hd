// RouterProvider.tsx
/**
 * Провайдер роутера для приложения.
 * Оборачивает дочерние компоненты в <BrowserRouter>.
 */
import React, { type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

interface RouterProviderProps {
  children: ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);
