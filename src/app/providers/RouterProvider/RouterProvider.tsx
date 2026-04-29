/**
 * Провайдер маршрутизации
 * Настраивает React Router для приложения
 */

import type { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { App } from '@/app'

/**
 * Router Provider компонент
 * Обертка для маршрутизации приложения
 * @returns React компонент с Router провайдером
 */
const RouterProvider: FC = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default RouterProvider

