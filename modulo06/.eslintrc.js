module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'standard',
    'prettier',
    'prettier/react',
    'prettier/standard',
    'plugin:react/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'standard'],
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
  },
}
