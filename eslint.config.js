import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';

export default [
    {
        ignores: ['dist'],
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            '@typescript-eslint': tseslint,
            prettier, // Adding Prettier plugin
        },
        extends: [
            'eslint:recommended',
            'plugin:react/recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:prettier/recommended', // Integrates Prettier with ESLint
        ],
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'prettier/prettier': 'warn', // Makes Prettier rules show as warnings
        },
    },
];
