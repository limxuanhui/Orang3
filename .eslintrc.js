module.exports = {
  root: true,
  plugins: ['@tanstack/query'],
  extends: [
    '@react-native-community',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
