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
        // Валидация minValue: не меньше min и не больше maxValue
        if (minValue !== latestMinRef.current) {
            const clampedMin = Math.max(min, Math.min(minValue, maxValue))
            setLocalMin(clampedMin)
            latestMinRef.current = clampedMin
        }
        // Валидация maxValue: не меньше minValue и не больше max
        if (maxValue !== latestMaxRef.current) {
            const clampedMax = Math.max(minValue, Math.min(maxValue, max))
            setLocalMax(clampedMax)
            latestMaxRef.current = clampedMax
        }
    }, [minValue, maxValue, min, max])

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

            // Валидация: значение не должно выходить за пределы min и max
            const clampedValue = Math.max(min, Math.min(value, max))

            // Определяем, к какому ползунку ближе клик
            const minPercent = getPercent(localMin)
            const maxPercent = getPercent(localMax)

            if (Math.abs(percent - minPercent) < Math.abs(percent - maxPercent)) {
                // Клик ближе к левому ползунку
                // Ограничить: не больше localMax и не больше maxValue
                const clampedValueForMin = Math.min(clampedValue, localMax, maxValue)
                if (clampedValueForMin <= localMax) {
                    setLocalMin(clampedValueForMin)
                    latestMinRef.current = clampedValueForMin
                }
            } else {
                // Клик ближе к правому ползунку
                // Ограничить: не меньше localMin и не меньше minValue
                const clampedValueForMax = Math.max(clampedValue, localMin, minValue)
                if (clampedValueForMax >= localMin) {
                    setLocalMax(clampedValueForMax)
                    latestMaxRef.current = clampedValueForMax
                }
            }
        },
        [getPercent, getValueFromPercent, localMin, localMax, minValue, maxValue, min, max]
    )

    /**
     * Запуск debounce
     */
    const runDebounce = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout(() => {
            let latestMin = latestMinRef.current
            let latestMax = latestMaxRef.current

            // Если ползунки пересеклись, переупорядочить их
            if (latestMin > latestMax) {
                ;[latestMin, latestMax] = [latestMax, latestMin]
            }

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
            // Ограничить значение: не меньше min, не больше localMax и не больше maxValue
            const clampedValue = Math.max(min, Math.min(newValue, localMax, maxValue))

            setLocalMin(clampedValue)
            latestMinRef.current = clampedValue

            runDebounce()
        },
        [min, localMax, maxValue, runDebounce]
    )

    /**
     * Обработчик изменения максимального значения
     */
    const handleMaxChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = parseFloat(e.target.value)
            // Ограничить значение: не меньше localMin, не больше max и не меньше minValue
            const clampedValue = Math.max(localMin, minValue, Math.min(newValue, max))

            setLocalMax(clampedValue)
            latestMaxRef.current = clampedValue

            runDebounce()
        },
        [localMin, minValue, max, runDebounce]
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
