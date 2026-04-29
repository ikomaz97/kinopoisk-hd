/**
 * Главный файл приложения
 * Инициализирует React и провайдеры
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@/app'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider />
  </React.StrictMode>,
)
