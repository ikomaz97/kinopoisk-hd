/**
 * Главный компонент приложения
 * Композиция страниц и логика маршрутизации
 */

import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import AppRouter from '@/app/routes/AppRouter'
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
        <AppRouter />
      </main>
      <Footer />
    </div>
  )
}

export default App

