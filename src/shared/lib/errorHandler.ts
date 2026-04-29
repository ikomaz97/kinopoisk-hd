// errorHandler.ts
/**
 * Утилита для обработки ошибок API.
 * Используется для логирования и отображения сообщений об ошибках.
 */

/**
 * Обрабатывает ошибки от API.
 * @param error - объект ошибки
 */
export const handleApiError = (error: unknown): void => {
  if (error instanceof Error) {
    console.error('API Error:', error.message);
  } else {
    console.error('Unknown API Error:', error);
  }
};

