// SearchBar.tsx
/**
 * Поисковая строка для ввода запроса.
 */
import React, { useState, useCallback } from 'react';
import styles from './SearchBar.module.css';
import { useSearch } from '@/features/search/hooks/useSearch';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const { search } = useSearch();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        search(query.trim());
      }
    },
    [query, search]
  );

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Поиск фильмов..."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Искать</button>
    </form>
  );
};

