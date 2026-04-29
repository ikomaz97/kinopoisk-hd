## План создания полной структуры проекта

1. **App‑слой**
   - StoreProvider, RouterProvider, ThemeProvider (с CSS‑модулем).
   - AppRouter с объявлением всех маршрутов согласно `ROUTES`.
   - Корневой компонент `App` (импорт `App.module.css`).
   - Redux‑store (`store.ts`) и базовый API (`baseApi.ts`).
   - Экспортные `index.ts` в `app/` и `app/providers/`.

2. **Pages**
   - MainPage, CategoryPage, SearchPage, FilteredPage, MovieDetailsPage, FavoritesPage, NotFoundPage.
   - Для каждой страницы: `*.tsx`, `*.module.css`, `index.ts`.

3. **Widgets**
   - Header, Footer, MovieList – компоненты, CSS‑модули, `index.ts`.

4. **Entities → movie**
   - UI: MovieCard, MoviePoster (+ CSS, `index.ts`).
   - API: `movieApi` с эндпоинтами поиска и деталей, Zod‑валидация.
   - Типы (`model/types.ts`), схемы (`model/schemas.ts`), `model/index.ts`.
   - Экспорт `api/index.ts` и `ui/index.ts`.

5. **Features**
   - **search**: SearchBar (+ CSS), `useSearch` hook, `model/index.ts`.
   - **favorites**: `favoritesSlice` с синхронизацией localStorage, `FavoriteButton` (+ CSS), хуки `useAppDispatch`, `useAppSelector`, `useDebounce`.
   - **filters**: FiltersPanel, GenreButton, RatingSlider (+ CSS), `useFilters` hook.
   - **theme**: `themeSlice`, `ThemeToggle` (+ CSS).
   - Для каждой фичи – `model/index.ts`, `ui/index.ts`, `hooks/index.ts`.

6. **Shared**
   - UI‑компоненты: Button, Loader, Skeleton, Badge, ErrorFallback (+ CSS, `index.ts`).
   - Библиотеки: `image`, `storage`.
   - Хуки: `useAppDispatch`, `useAppSelector`, `useDebounce`.
   - Константы: `constants/routes.ts`, `constants/api.ts` и их ре‑экспорт в `constants/index.ts`.
   - Типы проекта в `shared/types/index.ts` (например, `RootState`).
   - Декларация типов для CSS‑модулей (`global.d.ts`).

7. **Styles**
   - Глобальный файл `styles/global.css` (reset, базовые стили).

8. **Экспортные файлы**
   - `index.ts` во всех подпапках (providers, pages, widgets, entities, features, shared) для удобного ре‑экспорта.

9. **Дополнительно**
   - Сущность **actor** (API, типы, схемы, UI‑карточка) – при необходимости.
   - Глобальный `ErrorBoundary`, использующий `ErrorFallback`.
   - Тесты, CI, линтер – при дальнейшем развитии.

**Статус**: После выполнения всех пунктов проект будет полностью соответствовать исходному плану и готов к дальнейшей разработке бизнес‑логики.

