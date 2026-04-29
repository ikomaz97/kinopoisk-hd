// src/global.d.ts
/**
 * Декларация типов для CSS‑модулей.
 * Позволяет импортировать *.module.css без ошибок TypeScript.
 */
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css';
declare module '@/styles/*.css';
