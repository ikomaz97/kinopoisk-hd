/**
 * Главный компонент приложения
 * Композиция страниц и логика маршрутизации
 */

import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import AppRouter from '@/app/routes/AppRouter'
import { useTheme } from '@/features/theme'
import { useGlobalLoading } from '@/shared/hooks'
import { LinearProgress } from '@/shared/ui/Loader'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './App.module.css'

/**
 * Root компонент приложения
 * @returns React компонент приложения
 */
function App() {
  const { theme } = useTheme()
  const isGlobalLoading = useGlobalLoading()

  return (
    <div className={`${styles.app} ${theme}-theme`}>
      <Header />
      {isGlobalLoading && <LinearProgress />}
      <main className={styles.main}>
        <AppRouter />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App
