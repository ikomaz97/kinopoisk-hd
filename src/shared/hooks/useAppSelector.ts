// useAppSelector.ts
/**
 * Типизированный хук для получения состояния Redux.
 */
import { useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '@/app/store';

/**
 * Типизированный `useSelector` для Redux.
 * Использует тип `RootState` из store.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

