/**
 * Утилита для отображения toast-сообщений об ошибках.
 * Использует библиотеку react-toastify.
 */

import { toast } from 'react-toastify';

/**
 * Универсальная функция отображения ошибки.
 * @param message Текст сообщения для пользователя
 * @param error   Необязательный объект ошибки для логирования в консоль
 */
export const errorToast = (message: string, error?: unknown) => {
  toast(message, { theme: 'colored', type: 'error' });
  if (error) {
    console.error(message, error);
  }
};
