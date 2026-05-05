/**
 * Обрезает строку до указанной длины, добавляя многоточие, если она превышает maxLength.
 */
export const trimToMaxLength = (str: string, maxLength = 100): string =>
  str.length > maxLength ? `${str.slice(0, maxLength - 3)}...` : str;

