/**
 * Слайдер для выбора минимального рейтинга
 * Позволяет выбрать рейтинг от 0 до 10
 */

import type { FC } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
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
   * Обработчик изменения рейтинга с debounce
   */
  onChange: (value: number) => void
}

/**
 * Слайдер рейтинга с debounce 200мс
 * @param value текущее значение рейтинга
 * @param onChange обработчик изменения с debounce
 * @returns React компонент RatingSlider
 */
export const RatingSlider: FC<RatingSliderProps> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value)
  const [isDragging, setIsDragging] = useState(false)
  const prevValueRef = useRef(value)
  const debounceTimerRef = useRef<number | null>(null)

  /**
   * Синхронизация localValue с внешним value через useEffect
   * Используем prevValueRef для проверки изменения значения
   */
  useEffect(() => {
    if (prevValueRef.current !== value) {
      setLocalValue(value)
      prevValueRef.current = value
    }
  }, [value])

  /**
   * Обработчик изменения слайдера с debounce 200мс
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value)
      setLocalValue(newValue)
      setIsDragging(true)

      // Очистка предыдущего таймера, если он существует
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      // Debounce: отправляем значение только через 200мс после остановки
      debounceTimerRef.current = setTimeout(() => {
        onChange(newValue)
        setIsDragging(false)
        debounceTimerRef.current = null
      }, 200)
    },
    [onChange]
  )

  return (
    <div className={styles.container}>
      <label htmlFor="rating-slider" className={styles.label}>
        Минимальный рейтинг:{' '}
        <span style={{ fontWeight: isDragging ? 'normal' : 'bold' }}>
          {localValue.toFixed(1)}
        </span>
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
      {isDragging && (
        <div className={styles.debounceIndicator}>
          <span className={styles.loadingDot}></span>
        </div>
      )}
    </div>
  )
}
