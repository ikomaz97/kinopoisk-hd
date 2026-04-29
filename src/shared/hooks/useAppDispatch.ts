// useAppDispatch.ts
/**
 * Хук для получения типизированного dispatch из Redux store.
 */
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/app/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

