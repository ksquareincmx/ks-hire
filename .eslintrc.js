module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    // 'eslint-config-umi', // Umi configs
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
  ],
  plugins: ['@typescript-eslint', 'react-hooks'],
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use, default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
    },
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/prop-types': 0, // Typescript handles it
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: 'React',
        argsIgnorePattern: '(^_)|(props)',
      },
    ],
    '@typescript-eslint/interface-name-prefix': 'warn',
    '@typescript-eslint/camelcase': 0,
    'react/no-unescaped-entities': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-curly-spacing': [
      2,
      { when: 'never', allowMultiline: true },
    ],
    'react/jsx-no-duplicate-props': [
      1,
      {
        ignoreCase: false,
      },
    ],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
