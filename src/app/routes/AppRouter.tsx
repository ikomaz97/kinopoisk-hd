// AppRouter.tsx
/**
 * Основной роутер приложения.
 * Определяет маршруты согласно спецификации.
 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { CategoryPage } from '@/pages/CategoryPage';
import { SearchPage } from '@/pages/SearchPage';
import { FilteredPage } from '@/pages/FilteredPage';
import { MovieDetailsPage } from '@/pages/MovieDetailsPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const AppRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/category/:type" element={<CategoryPage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/filtered" element={<FilteredPage />} />
    <Route path="/movie/:id" element={<MovieDetailsPage />} />
    <Route path="/favorites" element={<FavoritesPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

