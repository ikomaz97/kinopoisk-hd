// Skeleton.tsx
/**
 * Скелетон‑заполнитель для контента.
 */
import React from 'react';
import styles from './Skeleton.module.css';

type SkeletonProps = {
  /** Ширина в пикселях или процентах */
  width?: string | number;
  /** Высота в пикселях или процентах */
  height?: string | number;
  /** Круглые углы */
  borderRadius?: string | number;
};

export const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = '1rem', borderRadius = '4px' }) => (
  <div
    className={styles.skeleton}
    style={{ width, height, borderRadius }}
    aria-hidden="true"
  />
);

