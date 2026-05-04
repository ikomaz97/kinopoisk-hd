/**
 * Компонент категоризации фильмов
 * Отображает кнопки для переключения между различными категориями
 */

import type { FC } from 'react'
import { useCallback } from 'react'
import styles from './CategoryTabs.module.css'

/**
 * Тип категории фильма
 */
type CategoryType = 'popular' | 'top_rated' | 'now_playing' | 'upcoming'

/**
 * Маппинг категорий на локализованные названия
 */
const CATEGORY_LABELS: Record<CategoryType, string> = {
  popular: 'Popular',
  top_rated: 'Top Rated',
  now_playing: 'Now Playing',
  upcoming: 'Upcoming',
}

/**
 * Пропсы компонента CategoryTabs
 */
interface CategoryTabsProps {
  /**
   * Текущая активная категория
   */
  activeCategory: CategoryType
  /**
   * Обработчик смены категории
   */
  onCategoryChange: (category: CategoryType) => void
}

/**
 * Компонент категоризации фильмов
 * Отображает 4 кнопки для выбора категории и визуально выделяет активную
 * @param activeCategory текущая активная категория
 * @param onCategoryChange колбэк при смене категории
 * @returns React компонент CategoryTabs
 */
const CategoryTabs: FC<CategoryTabsProps> = ({ activeCategory, onCategoryChange }) => {
  /**
   * Обработчик клика по кнопке категории
   * Передает выбранную категорию в родительский компонент
   */
  const handleCategoryClick = useCallback(
    (category: CategoryType) => {
      onCategoryChange(category)
    },
    [onCategoryChange]
  )

  const categories: CategoryType[] = ['popular', 'top_rated', 'now_playing', 'upcoming']

  return (
    <div className={styles.tabs}>
      {categories.map((category) => (
        <button
          key={category}
          className={`${styles.tab} ${activeCategory === category ? styles.active : ''}`}
          onClick={() => handleCategoryClick(category)}
          aria-pressed={activeCategory === category}
          aria-label={`Просмотреть ${CATEGORY_LABELS[category]} фильмы`}
        >
          {CATEGORY_LABELS[category]}
        </button>
      ))}
    </div>
  )
}

export default CategoryTabs

