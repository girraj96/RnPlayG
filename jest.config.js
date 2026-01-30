module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|' +
      '@react-native|' +
      '@react-navigation|' +
      'react-native-video|' +
      'react-native-fast-image|' +
      'react-native-toast-message|' +
      'react-native-device-info' +
      ')/)',
  ],
};
