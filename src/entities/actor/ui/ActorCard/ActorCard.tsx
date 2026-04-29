// ActorCard.tsx
/**
 * ВРЕМЕННО: Карточка актёра (заглушка).
 * TODO: Реализовать полную визуализацию с фото и данными.
 */
import React from 'react';
import styles from './ActorCard.module.css';

interface ActorCardProps {
  // ВРЕМЕННО: минимальный набор пропсов
  id?: number;
}

export const ActorCard: React.FC<ActorCardProps> = () => (
  <div className={styles.actorCard}>
    {/* ВРЕМЕННО: заглушка */}
    <div className={styles.photo}>No Photo</div>
    <div className={styles.name}>Actor Name</div>
  </div>
);
