/**
 * Компонент Loader
 * Отображает индикатор загрузки
 */

import type { FC } from 'react'
import { LinearProgress } from '@mui/material'
import styles from './Loader.module.css'

/**
 * Пропсы для компонента Loader
 */
interface LoaderProps {
  /**
   * Ширина загрузчика в процентах
   */
  width?: string
}

/**
 * Компонент индикатора загрузки
 * Использует Material UI LinearProgress
 * @param width ширина загрузчика
 * @returns React компонент Loader
 */
const Loader: FC<LoaderProps> = ({ width = '100%' }) => {
  return (
    <div className={styles.loader}>
      <LinearProgress
        className={styles.progress}
        sx={{
          width,
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'var(--color-accent)',
          }
        }}
      />
    </div>
  )
}

export default Loader

