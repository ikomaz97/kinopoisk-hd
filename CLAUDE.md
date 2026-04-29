# Правила для GitHub Copilot

## Стек и технологии
- React 18+ с TypeScript (строгая типизация)
- Redux Toolkit (RTK Query для API, Slice для состояния)
- React Router v6+
- Zod для валидации ответов API
- CSS Modules для стилизации
- Material UI (только LinearProgress, Skeleton, Snackbar)
- Vite как сборщик

## Комментарии
- ВСЕ комментарии в коде должны быть на РУССКОМ языке
- Комментировать назначение файла в его шапке
- Комментировать сложную логику, хуки, неочевидные решения
- Комментировать каждый редьюсер в слайсах
- Комментировать каждый эндпоинт RTK Query — для какой страницы/фичи используется

## Структура проекта (Feature-Sliced Design)
- `app/` — инициализация: провайдеры, роутинг, store
- `pages/` — страницы-роуты, композиция из widgets и features
- `widgets/` — крупные UI-блоки (Header, Footer, MovieList)
- `features/` — бизнес-фичи (search, favorites, filters)
- `entities/` — бизнес-сущности (movie, actor): API, типы, Zod-схемы, UI-карточки
- `shared/` — переиспользуемое: baseApi, хуки, утилиты, UI-кит

## Правила генерации кода
1. Импорты — абсолютные от корня (например, `@/entities/movie/ui/MovieCard`)
2. Каждый компонент — в отдельной папке: `ComponentName/ComponentName.tsx` + `ComponentName.module.css`
3. Экспорт через `index.ts` в каждой папке
4. Типы выносятся в `model/types.ts` внутри сущности/фичи
5. Zod-схемы в `model/schemas.ts`
6. API-эндпоинты в `api/` внутри сущности
7. Для фильмов без постера использовать `https://placehold.co/300x450?text=No+Poster`
8. Для актёров без фото использовать `https://placehold.co/185x185?text=No+Photo`
9. URL изображений TMDB формировать через утилиту `shared/lib/image.ts`
10. localStorage-операции выносить в утилиты, а не писать inline
11. Все ответы API валидировать через Zod в `transformResponse`
12. В CSS Module использовать camelCase: `.movieCard`, `.voteBadge`

## Именование
- Компоненты: PascalCase (`MovieCard`, `FiltersPanel`)
- Файлы компонентов: PascalCase (`MovieCard.tsx`)
- Хуки: camelCase с префиксом `use` (`useDebounce`, `useFavorites`)
- Слайсы: camelCase (`favoritesSlice`, `themeSlice`)
- API: camelCase с суффиксом `Api` (`movieApi`, `baseApi`)
- CSS модули: `ComponentName.module.css`
- Типы: PascalCase (`Movie`, `MovieDetails`)
- Zod-схемы: PascalCase с суффиксом `Schema` (`MovieSchema`)

## Redux Toolkit правила
- Весь API — через `injectEndpoints` в сущностях
- Базовый `createApi` — в `shared/api/baseApi.ts`
- Слайсы в `features/*/model/`
- При генерации RTK Query хука — сразу экспортировать его из `index.ts`
- Избранное: синхронизация с localStorage при инициализации и каждом изменении

## Маршруты (React Router v6)
- `/` — MainPage
- `/category/:type` — CategoryPage (type: popular | top_rated | upcoming | now_playing)
- `/filtered` — FilteredPage
- `/search` — SearchPage
- `/favorites` — FavoritesPage
- `/movie/:id` — MovieDetailsPage
- `*` — NotFoundPage

## Обработка ошибок
- Глобальный error boundary
- RTK Query `onError` для вывода toast/snackbar
- Zod-ошибки валидации логировать и показывать пользователю "Ошибка загрузки данных"
- Ошибки сети обрабатывать глобально

## Запрещено
- Не использовать axios (только RTK Query)
- Не писать бизнес-логику в pages (только композиция)
- Не использовать inline-стили (только CSS Modules)
- Не использовать any (всегда типизировать)
- Не оставлять console.log в production-коде
- Не использовать классовые компоненты (только функциональные)
- Не генерировать комментарии на английском