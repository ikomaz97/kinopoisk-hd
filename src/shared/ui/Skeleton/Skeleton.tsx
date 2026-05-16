/**
 * Компонент Skeleton
 * Индикатор-заглушка для контента, который ещё загружается
 * Заменяет MUI Skeleton кастомной реализацией
 */

import type { FC } from 'react'
import styles from './Skeleton.module.css'

/**
 * Пропсы для компонента Skeleton
 */
export interface SkeletonProps {
  /**
   * Вариант формы: текст или прямоугольник
   */
  variant?: 'text' | 'rectangular'
  /**
   * Дополнительные CSS-классы
   */
  className?: string
}

/**
 * Компонент Skeleton — заглушка для загружаемого контента
 * @param variant форма скелетона (text | rectangular)
 * @param className дополнительные классы
 * @returns React компонент Skeleton
 */
const Skeleton: FC<SkeletonProps> = ({
  variant = 'text',
  className = '',
}) => {
  const classes = [
    styles.root,
    variant === 'text' ? styles.text : styles.rectangular,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes} />
}

export default Skeleton
