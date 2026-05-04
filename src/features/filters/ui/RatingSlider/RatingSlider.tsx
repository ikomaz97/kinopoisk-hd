/**
 * Слайдер для выбора минимального рейтинга
 * Позволяет выбрать рейтинг от 0 до 10
 */

import type { FC } from 'react'
import { useCallback, useState } from 'react'
import styles from './RatingSlider.module.css'

/**
 * Пропсы для компонента RatingSlider
 */
export interface RatingSliderProps {
  /**
   * Текущее значение рейтинга
   */
  value: number

  /**
   * Обработчик изменения рейтинга
   */
  onChange: (value: number) => void
}

/**
 * Слайдер рейтинга
 * @param value текущее значение рейтинга
 * @param onChange обработчик изменения
 * @returns React компонент RatingSlider
 */
export const RatingSlider: FC<RatingSliderProps> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value)

  /**
   * Обработчик изменения слайдера
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value)
      setLocalValue(newValue)
      onChange(newValue)
    },
    [onChange]
  )

  return (
    <div className={styles.container}>
      <label htmlFor="rating-slider" className={styles.label}>
        Минимальный рейтинг: {localValue.toFixed(1)}
      </label>
      <input
        id="rating-slider"
        type="range"
        min="0"
        max="10"
        step="0.1"
        value={localValue}
        onChange={handleChange}
        className={styles.slider}
      />
      <div className={styles.rangeLabels}>
        <span>0</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  )
}
