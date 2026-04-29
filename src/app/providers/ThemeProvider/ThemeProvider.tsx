/**
 * Провайдер темы
 * Применяет текущую тему к корневому элементу документа
 * Выполняет синхронизацию Redux состояния с DOM
 */

import { useEffect } from 'react'
import { useTheme } from '@/features/theme'

/**
 * ThemeProvider компонент
 * Применяет CSS класс, соответствующий текущей теме
 * @returns React компонент (null - это провайдер, не отображает контент)
 */
const ThemeProvider = () => {
  const { theme } = useTheme()

  useEffect(() => {
    /**
     * Применяем класс темы к корневому элементу
     * документ будет иметь класс 'dark-theme' или 'light-theme'
     */
    const root = document.documentElement

    // Удаляем все классы тем
    root.classList.remove('dark-theme', 'light-theme')

    // Добавляем класс текущей темы
    root.classList.add(`${theme}-theme`)

    // Сохраняем тему в атрибут data для CSS
    root.setAttribute('data-theme', theme)
  }, [theme])

  return null
}

export default ThemeProvider

