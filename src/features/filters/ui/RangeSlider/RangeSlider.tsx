/**
 * RangeSlider — слайдер для выбора диапазона (минимум и максимум)
 *
 * Особенности:
 * - Два ползунка для выбора диапазона
 * - Debounce для onChange
 * - Защита от пересечения ползунков
 * - Корректная работа при быстром drag
 * - Без утечек (cleanup таймера)
 * - Миграция на MUI Slider с сохранением дизайна
 */

import type { FC } from 'react'
import { useEffect, useRef, useState, useCallback } from 'react'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
import styles from './RangeSlider.module.css'

// Кастомный стиль для MUI Slider, чтобы соответствовал дизайну
const CustomSlider = styled(Slider)({
    color: 'var(--color-accent)',
    height: 6,
    padding: '17px 0', // Увеличиваем зону клика по вертикали
    '& .MuiSlider-track': {
        border: 'none',
        borderRadius: 3,
        height: 6,
    },
    '& .MuiSlider-rail': {
        background: 'var(--color-bg-tertiary)',
        borderRadius: 3,
        opacity: 1,
        height: 6,
    },
    '& .MuiSlider-thumb': {
        width: 18,
        height: 18,
        background: 'var(--color-accent)',
        border: '2px solid var(--color-bg-primary, #fff)', // Обводка ползунка
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        // Центрируем thumb относительно трека
        top: '50%',
        transform: 'translate(-50%, -50%)',
        marginTop: 0,
        // Убираем стандартный псевдоэлемент MUI
        '&::before': {
            display: 'none',
        },
        // Стили для hover состояния
        '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            transform: 'translate(-50%, -50%) scale(1.1)',
        },
        // Стили для активного состояния (drag)
        '&.Mui-active': {
            transform: 'translate(-50%, -50%) scale(1.2)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        },
        // Стили для focus visible
        '&.Mui-focusVisible': {
            outline: '2px solid var(--color-accent)',
            outlineOffset: 2,
            transform: 'translate(-50%, -50%) scale(1.1)',
        },
    },
    '& .MuiSlider-valueLabel': {
        display: 'none', // Полностью скрываем value label
    },
})

/**
 * Пропсы компонента RangeSlider
 */
export interface RangeSliderProps {
    /** Минимальное значение диапазона */
    min: number

    /** Максимальное значение диапазона */
    max: number

    /** Текущее минимальное значение (оставляем для обратной совместимости) */
    minValue: number

    /** Текущее максимальное значение */
    maxValue: number

    /** Обработчик изменения диапазона */
    onChange: (minValue: number, maxValue: number) => void

    /** Задержка debounce (мс), по умолчанию 200 */
    debounceMs?: number

    /** Шаг изменения значения, по умолчанию 0.1 */
    step?: number

    /** Минимальное расстояние между ползунками, по умолчанию 0.1 */
    minDistance?: number
}

/**
 * Двухползунковый слайдер диапазона на базе MUI Slider
 */
export const RangeSlider: FC<RangeSliderProps> = ({
                                                      min,
                                                      max,
                                                      minValue,
                                                      maxValue,
                                                      onChange,
                                                      debounceMs = 200,
                                                      step = 0.1,
                                                      minDistance = 0.1, // по умолчанию минимальное расстояние 0.1
                                                  }) => {
    // Внутренний стейт в формате [min, max] для MUI
    const [value, setValue] = useState<[number, number]>([minValue, maxValue])

    // Refs для debounce и последних значений
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const latestValueRef = useRef<[number, number]>([minValue, maxValue])

    // Синхронизация с внешними пропсами
    useEffect(() => {
        const clampedMin = Math.max(min, Math.min(minValue, maxValue))
        const clampedMax = Math.max(minValue, Math.min(maxValue, max))

        if (clampedMin !== latestValueRef.current[0] || clampedMax !== latestValueRef.current[1]) {
            setValue([clampedMin, clampedMax])
            latestValueRef.current = [clampedMin, clampedMax]
        }
    }, [minValue, maxValue, min, max])

    // Cleanup таймера
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [])

    // Debounce-логика (переиспользуем оригинальную)
    const runDebounce = useCallback(
        (_newMin: number, _newMax: number) => {
            if (timerRef.current) clearTimeout(timerRef.current)

            timerRef.current = setTimeout(() => {
                const [latestMin, latestMax] = latestValueRef.current

                if (latestMin !== minValue || latestMax !== maxValue) {
                    onChange(latestMin, latestMax)
                }
                timerRef.current = null
            }, debounceMs)
        },
        [onChange, debounceMs, minValue, maxValue]
    )

    // Обработчик изменения для MUI
    const handleChange = useCallback(
        (_event: Event, newValue: number | number[], activeThumb: number) => {
            if (!Array.isArray(newValue)) return

            let [newMin, newMax] = newValue as [number, number]

            // Проверяем минимальное расстояние между ползунками
            const distance = newMax - newMin

            if (distance < minDistance) {
                if (activeThumb === 0) {
                    // Двигаем левый ползунок - не даем ему зайти за правый
                    newMin = Math.max(min, newMax - minDistance)
                } else {
                    // Двигаем правый ползунок - не даем ему зайти за левый
                    newMax = Math.min(max, newMin + minDistance)
                }
            }

            // Клэмпим к общим границам
            newMin = Math.max(min, Math.min(newMin, newMax))
            newMax = Math.max(newMin, Math.min(newMax, max))

            // Обновляем локальный стейт и ref
            setValue([newMin, newMax])
            latestValueRef.current = [newMin, newMax]

            // Запускаем debounce
            runDebounce(newMin, newMax)
        },
        [min, max, minDistance, runDebounce]
    )

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.label}>Rating</span>
                <span className={styles.rangeText}>
                    {value[0].toFixed(1)} - {value[1].toFixed(1)}
                </span>
            </div>

            <div className={styles.trackContainer}>
                <CustomSlider
                    value={value}
                    onChange={handleChange}
                    min={min}
                    max={max}
                    step={step}
                    valueLabelDisplay="off" // Отключаем value label
                    getAriaLabel={() => 'Диапазон рейтинга'}
                    disableSwap={true} // Запрещаем ползункам меняться местами
                    sx={{
                        // Точная настройка отступов для выравнивания с текстом "Rating"
                        margin: '0 20px',
                        width: 'calc(100% - 40px)',
                        // Убираем внутренние отступы MUI
                        '& .MuiSlider-root': {
                            padding: 0,
                            margin: 0,
                        },
                    }}
                />
            </div>
        </div>
    )
}