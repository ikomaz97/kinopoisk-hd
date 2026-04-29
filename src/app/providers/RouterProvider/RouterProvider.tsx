/**
 * Провайдер маршрутизации
 * Настраивает React Router для приложения
 * Объединяет все пров��йдеры (Store, Theme)
 */

import type { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from '@/app/providers/StoreProvider'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import App from '@/app/App'

/**
 * Router Provider компонент
 * Обертка для маршрутизации и провайдеров приложения
 * @returns React компонент с Router провайдером
 */
const RouterProvider: FC = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <ThemeProvider />
        <App />
      </StoreProvider>
    </BrowserRouter>
  )
}

export default RouterProvider


