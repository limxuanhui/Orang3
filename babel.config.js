module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        // blocklist: null,
        // allowlist: null,
        // blacklist: null, // DEPRECATED
        // whitelist: null, // DEPRECATED
        // safe: false,
        // allowUndefined: true,
        // verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        // root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: './src/tests',
          '@components': './src/components',
          '@screens': './src/components/screens',
          '@navigators': './src/components/navigators',
          '@icons': './src/components/common/icons',
          '@data': './src/data',
          '@constants': './src/utils/constants',
          '@hooks': './src/utils/hooks',
          '@contexts': './src/utils/contexts',
          '@helpers': './src/utils/helpers',
          '@redux': './src/utils/redux',
        },
      },
    ],
  ],
};
