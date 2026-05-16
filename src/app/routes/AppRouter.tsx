/**
 * Маршрутизатор приложения
 * Определяет все маршруты и соответствующие страницы
 */

import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import { MainPage } from '@/pages/MainPage'
import { CategoryPage } from '@/pages/CategoryPage'
import { FilteredPage } from '@/pages/FilteredPage'
import { SearchPage } from '@/pages/SearchPage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { MovieDetailsPage } from '@/pages/MovieDetailsPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

/**
 * AppRouter компонент
 * Определяет все маршруты приложения
 * @returns React компонент с маршрутами
 */
const AppRouter = () => {
  return (
    <Routes>
      {/* Главная страница */}
      <Route path={ROUTES.MAIN} element={<MainPage />} />

      {/* Страница категорий фильмов */}
      <Route path={ROUTES.CATEGORY} element={<CategoryPage />} />
      <Route path={`${ROUTES.CATEGORY}/:type`} element={<CategoryPage />} />

      {/* Страница фильтрации фильмов */}
      <Route path={ROUTES.FILTERED} element={<FilteredPage />} />

      {/* Страница поиска фильмов */}
      <Route path={ROUTES.SEARCH} element={<SearchPage />} />

      {/* Страница избранных фильмов */}
      <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />

      {/* Страница деталей фильма */}
      <Route path={ROUTES.MOVIE_DETAILS_PATTERN} element={<MovieDetailsPage />} />

      {/* Страница 404 - не найдено */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
