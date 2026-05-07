import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-config-prettier'

export default [
  {
    ignores: ['dist', 'build', 'coverage'],
  },

  // Base JS rules
  js.configs.recommended,

  // TypeScript
  ...tseslint.configs.recommendedTypeChecked,

  // React Hooks
  reactHooks.configs.flat.recommended,

  // Vite React Refresh
  reactRefresh.configs.vite,

  // Disable formatting-conflicting ESLint rules
  prettier,

  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      parser: tseslint.parser,

      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },

      globals: {
        ...globals.browser,
      },
    },

    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],

      '@typescript-eslint/no-floating-promises': 'error',

      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],
    },
  },
]