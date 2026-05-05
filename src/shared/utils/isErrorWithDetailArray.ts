/**
 * Проверка, содержит ли объект массив errors с detail строкой.
 */
export function isErrorWithDetailArray(
  error: unknown
): error is { errors: { detail: string }[] } {
  if (
    typeof error !== 'object' ||
    error === null ||
    !('errors' in error)
  ) {
    return false;
  }

  const errors = (error as Record<string, unknown>).errors;

  if (
    !Array.isArray(errors) ||
    errors.length === 0 ||
    typeof errors[0] !== 'object' ||
    errors[0] === null ||
    !('detail' in errors[0])
  ) {
    return false;
  }

  return typeof (errors[0] as Record<string, unknown>).detail === 'string';
}
