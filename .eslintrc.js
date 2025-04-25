module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'prettier'],
  overrides: [
    {
      files: ['__test__/**/*.test.js'],
      env: {
        es6: true,
      },
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        afterEach: 'readonly',
        beforeEach: 'readonly',
        xit: 'readonly',
        vi: 'readonly',
      },
    },
    {
      files: ['src/**/*.js'],
      parserOptions: {
        ecmaVersion: 5,
        sourceType: 'script',
      },
      plugins: ['es'],
      extends: ['plugin:es/restrict-to-es5'],
      rules: {},
    },
  ],
}
