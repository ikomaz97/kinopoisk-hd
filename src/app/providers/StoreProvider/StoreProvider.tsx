/**
 * Провайдер Redux Store
 * Обеспечивает доступ к Redux состоянию для всего приложения
 */

import type { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

/**
 * Пропсы для StoreProvider компонента
 */
interface StoreProviderProps {
  /**
   * Дочерние элементы, которые будут обернуты провайдером
   */
  children: ReactNode
}

/**
 * Store Provider компонент
 * Обертка Redux провайдера
 * @param children дочерние компоненты
 * @returns React компонент с Redux провайдером
 */
const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default StoreProvider

