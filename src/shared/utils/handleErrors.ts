/**
 * Универсальная обработка ошибок RTK Query.
 * Выводит toast‑сообщения в зависимости от типа и кода ошибки.
 */

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { errorToast } from '@/shared/utils/errorToast';
import { isErrorWithProperty } from '@/shared/utils/isErrorWithProperty';
import { isErrorWithDetailArray } from '@/shared/utils/isErrorWithDetailArray';
import { trimToMaxLength } from '@/shared/utils/trimToMaxLength';

/**
 * Обработчик ошибок RTK Query
 * @param error объект ошибки из RTK Query
 */
export const handleErrors = (error: FetchBaseQueryError) => {
  if (!error) return;

  switch (error.status) {
    // Ошибки сети и парсинга
    case 'FETCH_ERROR':
      errorToast('Ошибка сети. Проверьте подключение к интернету и попробуйте снова.');
      break;

    case 'PARSING_ERROR':
      errorToast('Ошибка обработки ответа сервера. Попробуйте позже.');
      break;

    case 'CUSTOM_ERROR':
    case 'TIMEOUT_ERROR':
      errorToast('Превышено время ожидания ответа от сервера. Попробуйте снова.');
      break;

    // Ошибки валидации и доступа
    case 400:
    case 403:
      if (isErrorWithDetailArray(error.data)) {
        errorToast(trimToMaxLength(error.data.errors[0].detail));
      } else {
        errorToast(JSON.stringify(error.data));
      }
      break;

    // Ресурс не найден
    case 404:
      if (isErrorWithProperty(error.data, 'error')) {
        errorToast(error.data.error);
      } else if (isErrorWithProperty(error.data, 'message')) {
        errorToast(error.data.message);
      } else {
        errorToast('Запрашиваемая страница не найдена. Проверьте URL и попробуйте снова.');
      }
      break;

    // Ошибки авторизации и лимиты
    case 401:
      if (isErrorWithProperty(error.data, 'message')) {
        errorToast(error.data.message);
      } else {
        errorToast('Ошибка авторизации. Пожалуйста, проверьте токен доступа и попробуйте снова.');
      }
      break;

    case 429:
      if (isErrorWithProperty(error.data, 'message')) {
        errorToast(error.data.message);
      } else {
        errorToast('Слишком много запросов. Пожалуйста, подождите перед повторной попыткой.');
      }
      break;

    // Серверные ошибки 5xx
    default:
      if (typeof error.status === 'number' && error.status >= 500 && error.status < 600) {
        errorToast('На сервере произошла ошибка. Пожалуйста, попробуйте позже.');
      } else {
        errorToast('Произошла неизвестная ошибка. Пожалуйста, попробуйте снова.');
      }
  }
};
