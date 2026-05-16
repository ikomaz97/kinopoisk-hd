/**
 * Компонент LinearProgress
 * Отображает горизонтальный индикатор загрузки
 */

import type { FC } from 'react'
import styles from './LinearProgress.module.css'

/**
 * Компонент горизонтального индикатора загрузки
 * @returns React компонент LinearProgress
 */
const LinearProgress: FC = () => {
  return (
    <div className={styles.root}>
      <div className={`${styles.bar} ${styles.indeterminate1}`} />
      <div className={`${styles.bar} ${styles.indeterminate2}`} />
    </div>
  )
}

export default LinearProgress
