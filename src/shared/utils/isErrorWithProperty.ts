/**
 * Проверка, содержит ли объект указанное строковое свойство.
 * Возвращает true, если error – объект и имеет свойство property типа string.
 */
export function isErrorWithProperty<T extends string>(
  error: unknown,
  property: T
): error is Record<T, string> {
  return (
    typeof error === 'object' &&
    error != null &&
    property in error &&
    typeof (error as Record<string, unknown>)[property] === 'string'
  );
}

