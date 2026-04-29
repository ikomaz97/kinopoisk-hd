/**
 * Главный компонент приложения
 * Композиция страниц и логика маршрутизации
 */

import { Header } from '@/widgets/Header'
import styles from './App.module.css'

/**
 * Root компонент приложения
 * @returns React компонент приложения
 */
function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>🎬 Добро пожаловать в Kinopoisk HD</h1>
          <p>Используйте навигацию в Header для просмотра фильмов</p>
        </div>
      </main>
    </div>
  )
}

export default App

