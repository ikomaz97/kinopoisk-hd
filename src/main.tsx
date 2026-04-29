/**
 * Главный файл приложения
 * Инициализирует React и провайдеры
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'

// Удалите этот импорт, когда создадите App компонент
// import App from '@/app'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🎬 Kinopoisk HD</h1>
      <p>
        CSS модули и абсолютные импорты уже настроены!
      </p>
      <p>Начните разработку с создания App компонента в src/app/App.tsx</p>
    </div>
  </React.StrictMode>,
)

