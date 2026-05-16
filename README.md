# КиноHD — Поиск и каталог фильмов

**КиноHD** — это веб-приложение для поиска, просмотра и каталогизации фильмов с использованием **TMDB API**. Проект построен на современном стеке React + TypeScript с архитектурой **Feature-Sliced Design (FSD)**.

## Возможности

- **Популярные, лучшие, новинки и предстоящие фильмы** на главной странице
- **Поиск фильмов** по названию с пагинацией
- **Фильтрация** по жанрам, рейтингу и сортировке
- **Детальная страница фильма** с описанием, актёрами, трейлерами и похожими фильмами
- **Избранное** — добавление/удаление фильмов с синхронизацией в `localStorage`
- **Тёмная и светлая темы** с сохранением выбора
- **Адаптивный дизайн** и CSS Modules
- **Поддержка русского языка** интерфейса и данных

## Стек технологий

| Технология | Назначение |
|---|---|
| **React 19** | UI-библиотека |
| **TypeScript** (strict mode) | Типизация |
| **Vite 8** | Сборщик |
| **Redux Toolkit** (RTK Query) | Управление состоянием и работа с API |
| **React Router 7** | Маршрутизация |
| **Zod** | Валидация ответов API |
| **CSS Modules** | Стилизация компонентов |
| **Material UI** (LinearProgress, Skeleton) | Готовые UI-компоненты |
| **react-toastify** | Уведомления об ошибках |

## Архитектура (Feature-Sliced Design)

Проект организован по методологии **Feature-Sliced Design**:

```
src/
├── app/              # Инициализация приложения
│   ├── providers/    # Провайдеры (Redux Store, Theme, Router)
│   └── routes/       # Конфигурация маршрутов
├── pages/            # Страницы-роуты (композиция виджетов и фич)
│   ├── MainPage/     # Главная
│   ├── CategoryPage/ # Категории
│   ├── FilteredPage/ # Фильтрация
│   ├── SearchPage/   # Поиск
│   ├── FavoritesPage/# Избранное
│   ├── MovieDetailsPage/ # Детали фильма
│   └── NotFoundPage/ # 404
├── widgets/          # Крупные UI-блоки (Header, Footer, MovieList)
├── features/         # Бизнес-фичи
│   ├── favorites/    # Избранное (слайс + localStorage)
│   ├── filters/      # Фильтры и сортировка
│   ├── search/       # Поиск по названию
│   └── theme/        # Тёмная/светлая тема
├── entities/         # Бизнес-сущности
│   ├── movie/        # Фильмы (API, типы, схемы, UI-карточки)
│   └── actor/        # Актёры (заготовка)
├── shared/           # Переиспользуемые модули
│   ├── api/          # Базовый RTK Query API
│   ├── constants/    # Константы (API, маршруты, жанры)
│   ├── hooks/        # Общие хуки (useDebounce, useGlobalLoading)
│   ├── lib/          # Утилиты (изображения, localStorage)
│   ├── types/        # Общие типы
│   ├── ui/           # UI-кит (Button, Loader, Pagination, Badge...)
│   └── utils/        # Вспомогательные функции
└── styles/           # Глобальные стили
```

## Страницы и маршруты

| Маршрут | Страница |
|---|---|
| `/` | **MainPage** — популярные, лучшие, новинки, предстоящие |
| `/category/:type` | **CategoryPage** — список по категории (`popular`, `top_rated`, `upcoming`, `now_playing`) |
| `/filtered` | **FilteredPage** — расширенная фильтрация по жанрам и рейтингу |
| `/search` | **SearchPage** — поиск фильмов по названию |
| `/favorites` | **FavoritesPage** — избранные фильмы |
| `/movie/:id` | **MovieDetailsPage** — детальная информация о фильме |
| `*` | **NotFoundPage** — 404 |

## Установка и запуск

### Требования

- Node.js 18+
- npm / pnpm / yarn
- Токен доступа к [TMDB API](https://www.themoviedb.org/settings/api)

### Установка

```bash
# Клонировать репозиторий
git clone <url-репозитория>
cd kinopoisk-hd

# Установить зависимости
pnpm install
```

### Настройка TMDB API

Создайте файл `.env.local` в корне проекта:

```env
VITE_TMDB_ACCESS_TOKEN=ваш_токен_доступа
```

Получить токен можно на [TMDB API Settings](https://www.themoviedb.org/settings/api) после регистрации.

### Запуск в режиме разработки

```bash
pnpm dev
```

### Сборка для production

```bash
pnpm build
```

### Предпросмотр production-сборки

```bash
pnpm preview
```

## Линтинг

Проект использует ESLint с TypeScript-правилами:

```bash
pnpm lint
```

## Лицензия

Проект распространяется под лицензией **MIT**.
