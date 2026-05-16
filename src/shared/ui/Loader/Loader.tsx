/**
 * Компонент Loader
 * Отображает индикатор загрузки
 */

import type { FC } from 'react'
import LinearProgress from './LinearProgress'
import styles from './Loader.module.css'

/**
 * Компонент индикатора загрузки
 * Использует кастомный LinearProgress из UI-кита
 * @returns React компонент Loader
 */
const Loader: FC = () => {
  return (
    <div className={styles.loader}>
      <LinearProgress />
    </div>
  )
}

export default Loader
