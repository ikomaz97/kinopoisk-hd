/**
 * RangeSlider — слайдер для выбора диапазона (минимум и максимум)
 *
 * Особенности:
 * - Два ползунка для выбора диапазона
 * - Debounce для onChange
 * - Защита от пересечения ползунков
 * - Корректная работа при быстром drag
 * - Без утечек (cleanup таймера)
 */

import type { FC, ChangeEvent, MouseEvent } from 'react'
import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './RangeSlider.module.css'

/**
 * Пропсы компонента RangeSlider
 */
export interface RangeSliderProps {
    /** Минимальное значение диапазона */
    min: number

    /** Максимальное значение диапазона */
    max: number

    /** Текущее минимальное значение */
    minValue: number

    /** Текущее максимальное значение */
    maxValue: number

    /** Обработчик изменения диапазона */
    onChange: (minValue: number, maxValue: number) => void

    /** Задержка debounce (мс), по умолчанию 200 */
    debounceMs?: number

    /** Шаг изменения значения, по умолчанию 0.1 */
    step?: number
}

/**
 * Двухползунковый слайдер диапазона
 */
export const RangeSlider: FC<RangeSliderProps> = ({
    min,
    max,
    minValue,
    maxValue,
    onChange,
    debounceMs = 200,
    step = 0.1,
}) => {
    const [localMin, setLocalMin] = useState(minValue)
    const [localMax, setLocalMax] = useState(maxValue)

    // Храним последние значения для debounce
    const latestMinRef = useRef(minValue)
    const latestMaxRef = useRef(maxValue)

    // Таймер debounce
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    /**
     * Синхронизация локальных значений с внешними
     */
    useEffect(() => {
        if (minValue !== latestMinRef.current) {
            setLocalMin(minValue)
            latestMinRef.current = minValue
        }
        if (maxValue !== latestMaxRef.current) {
            setLocalMax(maxValue)
            latestMaxRef.current = maxValue
        }
    }, [minValue, maxValue])

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
     * Расчет позиции ползунка в процентах
     */
    const getPercent = useCallback((value: number) => {
        return ((value - min) / (max - min)) * 100
    }, [min, max])

    /**
     * Расчет значения из позиции в процентах
     */
    const getValueFromPercent = useCallback((percent: number) => {
        return min + (percent / 100) * (max - min)
    }, [min, max])

    /**
     * Обработчик клика по треку
     */
    const handleTrackClick = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const clickPosition = e.clientX - rect.left
            const trackWidth = rect.width
            const percent = (clickPosition / trackWidth) * 100
            const value = getValueFromPercent(percent)

            // Определяем, к какому ползунку ближе клик
            const minPercent = getPercent(localMin)
            const maxPercent = getPercent(localMax)

            if (Math.abs(percent - minPercent) < Math.abs(percent - maxPercent)) {
                // Клик ближе к левому ползунку
                if (value < localMax - step) {
                    setLocalMin(value)
                    latestMinRef.current = value
                }
            } else {
                // Клик ближе к правому ползунку
                if (value > localMin + step) {
                    setLocalMax(value)
                    latestMaxRef.current = value
                }
            }
        },
        [getPercent, getValueFromPercent, localMin, localMax, step]
    )

    /**
     * Запуск debounce
     */
    const runDebounce = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout(() => {
            const latestMin = latestMinRef.current
            const latestMax = latestMaxRef.current

            // Защита от лишних вызовов
            if (latestMin !== minValue || latestMax !== maxValue) {
                onChange(latestMin, latestMax)
            }

            timerRef.current = null
        }, debounceMs)
    }, [onChange, debounceMs, minValue, maxValue])

    /**
     * Обработчик изменения минимального значения
     */
    const handleMinChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = parseFloat(e.target.value)
            const clampedValue = Math.max(min, Math.min(newValue, localMax - step))

            setLocalMin(clampedValue)
            latestMinRef.current = clampedValue

            runDebounce()
        },
        [min, localMax, step, runDebounce]
    )

    /**
     * Обработчик изменения максимального значения
     */
    const handleMaxChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = parseFloat(e.target.value)
            const clampedValue = Math.max(minValue + step, Math.min(newValue, max))

            setLocalMax(clampedValue)
            latestMaxRef.current = clampedValue

            runDebounce()
        },
        [minValue, step, max, runDebounce]
    )

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.label}>Rating</span>
                <span className={styles.rangeText}>
                    {localMin.toFixed(1)} - {localMax.toFixed(1)}
                </span>
            </div>

            <div className={styles.trackContainer} onClick={handleTrackClick}>
                <div className={styles.track}>
                    {/* Индикатор заполненной области */}
                    <div
                        className={styles.fill}
                        style={{
                            left: `${getPercent(localMin)}%`,
                            right: `${100 - getPercent(localMax)}%`,
                        }}
                    />

                    {/* Минимальный ползунок */}
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={localMin}
                        onChange={handleMinChange}
                        className={styles.sliderMin}
                        aria-label="Минимальный рейтинг"
                    />

                    {/* Максимальный ползунок */}
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={localMax}
                        onChange={handleMaxChange}
                        className={styles.sliderMax}
                        aria-label="Максимальный рейтинг"
                    />
                </div>
            </div>
        </div>
    )
}
