import { toast } from 'react-toastify';

/**
 * Универсальная функция отображения успешного сообщения.
 * @param message Текст сообщения для пользователя
 */
export const successToast = (message: string) => {
  toast(message, { theme: 'colored', type: 'success' });
};

