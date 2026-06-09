import treppConfig from '@trepp/eslint-config';

export default [
  { ignores: ['dist/', 'lib/', 'node_modules/'] },
  ...treppConfig,
  {
    rules: {
      'no-console': 0,
    },
    languageOptions: {
      sourceType: 'module',
    },
    settings: {
      tailwindcss: {
        config: { content: [] },
      },
    },
  },
];
