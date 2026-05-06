/**
 * RatingSlider — слайдер для выбора минимального рейтинга (0–10)
 *
 * Особенности:
 * - Debounce для onChange (по умолчанию 200мс)
 * - Защита от лишних вызовов
 * - Корректная работа при быстром drag
 * - Без утечек (cleanup таймера)
 */

import type { FC, ChangeEvent } from 'react'
import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './RatingSlider.module.css'

/**
 * Пропсы компонента RatingSlider
 */
export interface RatingSliderProps {
    /** Текущее значение рейтинга */
    value: number

    /** Обработчик изменения рейтинга */
    onChange: (value: number) => void

    /** Задержка debounce (мс), по умолчанию 200 */
    debounceMs?: number
}

/**
 * Слайдер рейтинга с debounce
 */
export const RatingSlider: FC<RatingSliderProps> = ({
                                                        value,
                                                        onChange,
                                                        debounceMs = 200,
                                                    }) => {
    const [localValue, setLocalValue] = useState(value)
    const [isDragging, setIsDragging] = useState(false)

    // Храним последнее значение для debounce
    const latestValueRef = useRef(value)

    // Таймер debounce
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    /**
     * Синхронизация локального значения с внешним
     */
    useEffect(() => {
        if (value !== latestValueRef.current) {
            setLocalValue(value)
            latestValueRef.current = value
        }
    }, [value])

    /**
     * Очистка таймера при размонтировании
     */
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [])

    /**
     * Запуск debounce
     */
    const runDebounce = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout(() => {
            const latest = latestValueRef.current

            // Защита от лишних вызовов
            if (latest !== value) {
                onChange(latest)
            }

            setIsDragging(false)
            timerRef.current = null
        }, debounceMs)
    }, [onChange, debounceMs, value])

    /**
     * Обработчик изменения слайдера
     */
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = parseFloat(e.target.value)

            setLocalValue(newValue)
            latestValueRef.current = newValue

            runDebounce()
        },
        [runDebounce]
    )

    /**
     * Начало drag
     */
    const handleMouseDown = () => {
        setIsDragging(true)
    }

    /**
     * Конец drag (ускоряем отправку значения)
     */
    const handleMouseUp = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }

        const latest = latestValueRef.current

        if (latest !== value) {
            onChange(latest)
        }

        setIsDragging(false)
    }

    return (
        <div className={styles.container}>
            <label htmlFor="rating-slider" className={styles.label}>
                Минимальный рейтинг:{' '}
                <span
                    className={
                        isDragging ? styles.valueDragging : styles.value
                    }
                >
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
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
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