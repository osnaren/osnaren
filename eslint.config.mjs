import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';
import importXPlugin from 'eslint-plugin-import-x';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import refreshPlugin from 'eslint-plugin-react-refresh';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      '@next/next': nextPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'react-refresh': refreshPlugin,
      'import-x': importXPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // --- React ---
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // --- React Refresh ---
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
          allowExportNames: ['metadata', 'generateMetadata', 'generateStaticParams', 'viewport', 'dynamic', 'revalidate', 'fetchCache', 'runtime', 'preferredRegion', 'alt', 'size', 'contentType'],
        },
      ],

      // --- TypeScript ---
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports', fixStyle: 'separate-type-imports' }],
      '@typescript-eslint/no-import-type-side-effects': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      'no-undef': 'off',

      // --- Import ordering & hygiene ---
      'import-x/no-duplicates': ['warn', { 'prefer-inline': true }],
      'import-x/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'type',
          ],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'react/**', group: 'external', position: 'before' },
            { pattern: 'next/**', group: 'external', position: 'before' },
            { pattern: '@/**', group: 'internal', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['react', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // --- General best practices ---
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-alert': 'warn',
      'prefer-const': 'warn',
      'no-var': 'error',
      'object-shorthand': ['warn', 'always'],
      'prefer-template': 'warn',
      'no-useless-rename': 'warn',
      'no-throw-literal': 'warn',
      'eqeqeq': ['warn', 'always', { null: 'ignore' }],

      // Disable strict hook checks that flag hydration pattern
      'react-hooks/set-state-in-effect': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  ...compat.extends('prettier'),
  {
    ignores: ['node_modules', '.next', 'out', 'public', '**/components/ui/**', '**/components/magicui/**', 'types'],
  },
);

export default eslintConfig;
