/**
 * Хук для реализации бесконечного скролла
 * Отслеживает прокрутку страницы и вызывает колбэк при достижении низа
 *
 * @param isLoading флаг загрузки данных
 * @param hasMore флаг наличия ещё данных для загрузки
 * @param onLoadMore колбэк для загрузки следующей страницы
 */

import { useEffect, useCallback } from 'react'

export function useInfiniteScroll(
  isLoading: boolean,
  hasMore: boolean,
  onLoadMore: () => void
): (node: HTMLElement | null) => void {
  /**
   * Обработчик скролла
   * Проверяет, достиг ли пользователь низа страницы
   */
  const handleScroll = useCallback(() => {
    // Если идёт загрузка или данных больше нет, пропускаем
    if (isLoading || !hasMore) {
      return
    }

    // Получаем позицию скролла и размеры документа
    const scrollTop = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    // Если прокрутили до низа страницы (осталось менее 200px до конца)
    if (scrollTop + windowHeight >= documentHeight - 200) {
      onLoadMore()
    }
  }, [isLoading, hasMore, onLoadMore])

  /**
   * Эффект для добавления/удаления слушателя скролла
   */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  /**
   * Ref-функция для IntersectionObserver (альтернативный подход)
   * Возвращаем функцию, которая может быть использована как ref
   */
  return useCallback(() => {
    // Эта функция возвращается для использования в компоненте
    // Она не делает ничего, так как мы используем window.addEventListener
  }, [])
}

