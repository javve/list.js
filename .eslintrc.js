module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 5,
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: [],
  overrides: [
    {
      files: ['__test__/**/*.test.js'],
      // valfritt: kan lägga till globals om du använder t.ex. describe, it utan import
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        afterEach: 'readonly',
        beforeEach: 'readonly',
        vi: 'readonly', // om du använder Vitests `vi.fn()` osv
      },
    },
    {
      files: ['src/**/*.js'],
      rules: {
        'no-var': 'off',
        'prefer-const': 'off',
      },
    },
  ],
  rules: {
    // Egna regler (lägg till/ändra här vid behov)
  },
}
