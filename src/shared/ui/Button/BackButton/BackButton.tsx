/**
 * Кнопка "Назад"
 * Возвращает пользователя на предыдущую страницу в истории браузера.
 */

import type { FC } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import styles from './BackButton.module.css';

/**
 * Пропсы компонента BackButton
 * @param label Текст кнопки (по умолчанию "Назад")
 */
interface BackButtonProps {
  label?: string;
}

/**
 * Универсальная кнопка "Назад"
 * @param props Пропсы компонента
 * @returns React элемент кнопки
 */
const BackButton: FC<BackButtonProps> = ({ label = 'Назад' }) => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Button onClick={handleClick} className={styles.backButton}>
      {label}
    </Button>
  );
};

export default BackButton;

