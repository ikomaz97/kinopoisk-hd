/**
 * Хук для debounce значения
 * Позволяет откладывать выполнение функции или обновление значения
 */

import { useState, useEffect } from 'react'

/**
 * Хук debounce
 * @param value значение для debounce
 * @param delay задержка в миллисекундах
 * @returns debounced значение
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

