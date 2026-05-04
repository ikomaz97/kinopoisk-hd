/**
 * Главный компонент приложения
 * Композиция страниц и логика маршрутизации
 */

import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import AppRouter from '@/app/routes/AppRouter'
import { useTheme } from '@/features/theme'
import styles from './App.module.css'

/**
 * Root компонент приложения
 * @returns React компонент приложения
 */
function App() {
  const { theme } = useTheme()

  return (
    <div className={`${styles.app} ${theme}-theme`}>
      <Header />
      <main className={styles.main}>
        <AppRouter />
      </main>
      <Footer />
    </div>
  )
}

export default App
