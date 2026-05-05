/**
 * Компонент LinearProgress
 * Отображает горизонтальный индикатор загрузки
 */

import type { FC } from 'react'
import styles from './LinearProgress.module.css'

/**
 * Пропсы для компонента LinearProgress
 */
interface LinearProgressProps {
  /**
   * Высота загрузчика в пикселях
   */
  height?: number
}

/**
 * Компонент горизонтального индикатора загрузки
 * Использует Material UI LinearProgress с кастомными стилями
 * @param height высота загрузчика (по умолчанию 4px)
 * @returns React компонент LinearProgress
 */
const LinearProgress: FC<LinearProgressProps> = ({ height = 4 }) => {
  return (
    <div className={styles.root} style={{ height }}>
      <div className={`${styles.bar} ${styles.indeterminate1}`} />
      <div className={`${styles.bar} ${styles.indeterminate2}`} />
    </div>
  )
}

export default LinearProgress
