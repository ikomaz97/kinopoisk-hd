/**
 * Компонент ActorCard
 * Отображает карточку актёра с фото, именем и ролью
 */

import type { FC } from 'react'
import { getProfileUrl } from '@/shared/lib/image'
import styles from './ActorCard.module.css'

/**
 * Пропсы для компонента ActorCard
 */
export interface ActorCardProps {
  /**
   * Имя актёра
   */
  name: string
  /**
   * Путь к фото актёра
   */
  profilePath: string | null
  /**
   * Роль персонажа
   */
  character?: string
  /**
   * Дополнительные CSS-классы
   */
  className?: string
}

/**
 * Карточка актёра с фото, именем и ролью
 * @param name имя актёра
 * @param profilePath путь к фото
 * @param character роль
 * @param className дополнительные классы
 * @returns React компонент ActorCard
 */
const ActorCard: FC<ActorCardProps> = ({ name, profilePath, character, className = '' }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <img
        src={getProfileUrl(profilePath)}
        alt={name}
        className={styles.photo}
        loading="lazy"
      />
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        {character && <span className={styles.character}>{character}</span>}
      </div>
    </div>
  )
}

export default ActorCard
