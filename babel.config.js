module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        // root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: './src/tests',
          '@resources': './src/utils/resources',
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
