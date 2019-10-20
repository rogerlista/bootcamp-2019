module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['standard', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    camelcase: [2, { properties: 'never', ignoreDestructuring: true }],
  },
}
