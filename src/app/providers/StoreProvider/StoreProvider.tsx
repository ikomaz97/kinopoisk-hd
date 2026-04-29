// StoreProvider.tsx
/**
 * Провайдер Redux Store для всего приложения.
 * Оборачивает дочерние компоненты в <Provider store={store}>.
 */
import React, { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
