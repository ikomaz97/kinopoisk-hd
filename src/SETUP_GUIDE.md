/**
 * Справка по CSS Модулям и Абсолютным Импортам
 * 
 * Все необходимые конфигурации уже настроены.
 * Вот как их использовать.
 */

// ============================================
// 1. АБСОЛЮТНЫЕ ИМПОРТЫ ЧЕРЕЗ @
// ============================================

// ✅ ПРАВИЛЬНО: используем абсолютные импорты от корня src/
import { MovieCard } from '@/entities/movie/ui/MovieCard'
import { Button } from '@/shared/ui/Button'
import { useDebounce } from '@/shared/hooks'
import { API_BASE_URL } from '@/shared/constants/api'

// ❌ НЕПРАВИЛЬНО: относительные импорты (не используем)
// import { MovieCard } from '../../entities/movie/ui/MovieCard'


// ============================================
// 2. CSS МОДУЛИ
// ============================================

// ✅ ПРАВИЛЬНО: импорт CSS модуля как объект
import styles from './MovieCard.module.css'

// Использование в компоненте:
function MovieCard() {
  return (
    <div className={styles.movieCard}>
      <h2 className={styles.title}>Название фильма</h2>
      <p className={styles.description}>Описание</p>
    </div>
  )
}

// ✅ CSS классы в camelCase (автоматически конвертируются)
// В файле .module.css пишете: .movie-card, а TypeScript видит: styles.movieCard


// ============================================
// 3. СТРУКТУРА ФАЙЛОВ СТИЛЕЙ
// ============================================

/*
✅ ПРАВИЛЬНО:
  entities/movie/ui/MovieCard/
    ├── MovieCard.tsx          (компонент)
    ├── MovieCard.module.css   (стили)
    └── index.ts              (экспорт)

❌ НЕПРАВИЛЬНО:
  - inline-стили (style={{ color: 'red' }})
  - глобальные CSS файлы (Global.css в компонентах)
  - classnames без типизации
*/


// ============================================
// 4. ТИПИЗАЦИЯ
// ============================================

// TypeScript автоматически:
// ✅ Проверяет наличие классов в .module.css
// ✅ Предлагает автодополнение для styles.xxx
// ✅ Показывает ошибку, если класса не существует

// Это работает благодаря:
// 1. Файлу src/types/css-modules.d.ts
// 2. Конфигурации tsconfig.app.json с "types": ["vite/client"]
// 3. Конфигурации vite.config.ts с css.modules


// ============================================
// 5. ПРИМЕРЫ
// ============================================

// Пример компонента с правильными импортами:
/*
// src/entities/movie/ui/MovieCard/MovieCard.tsx

import { FC } from 'react'
import styles from './MovieCard.module.css'
import { Movie } from '@/entities/movie/model/types'

interface MovieCardProps {
  movie: Movie
}

/**
 * Карточка фильма
 * @param props - пропсы компонента
 * @returns React компонент
 *\\/
const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className={styles.card}>
      <img src={movie.poster} alt={movie.title} />
      <h3 className={styles.title}>{movie.title}</h3>
    </div>
  )
}

export default MovieCard
*/


// ============================================
// СДЕЛАННЫЕ ИЗМЕНЕНИЯ
// ============================================

/*
Все необходимое уже настроено:

1. ✅ vite.config.ts
   - Alias '@' → 'src/'
   - CSS modules с camelCase конвенцией

2. ✅ tsconfig.app.json
   - paths: "@/*": ["src/*"]
   - types: ["vite/client"]

3. ✅ src/types/css-modules.d.ts
   - Декларация типов для *.module.css

Теперь можете свободно использовать:
- Импорты через @/...
- CSS модули (.module.css файлы)
- Полную типизацию CSS классов
*/

