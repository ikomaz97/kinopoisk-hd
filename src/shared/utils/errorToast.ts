import { toast } from 'react-toastify';

/**
 * Универсальная функция отображения ошибки.
 * @param message Текст сообщения для пользователя
 * @param error   Необязательный объект ошибки для логирования в консоль
 */
export const errorToast = (message: string, error?: unknown) => {
  toast(message, { theme: 'colored', type: 'error' });
  if (error) {
    // eslint-disable-next-line no-console
    console.error(message, error);
  }
};

