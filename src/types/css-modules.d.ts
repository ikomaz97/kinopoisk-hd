/**
 * Декларация типов для CSS модулей
 * Позволяет TypeScript правильно типизировать импорты файлов .module.css
 */

declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

