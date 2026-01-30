// Mock react-native-video
jest.mock('react-native-video', () => 'Video');

// Mock fast image
jest.mock('react-native-fast-image', () => {
  const React = require('react');
  const { Image } = require('react-native');

  const FastImage = props => <Image {...props} />;

  FastImage.priority = {
    low: 'low',
    normal: 'normal',
    high: 'high',
  };

  FastImage.cacheControl = {
    immutable: 'immutable',
    web: 'web',
    cacheOnly: 'cacheOnly',
  };

  return FastImage;
});

// Mock react-navigation
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(() =>
    Promise.resolve({
      isConnected: true,
    }),
  ),
  addEventListener: jest.fn(),
}));

jest.mock('react-native-device-info', () => ({
  getVersion: jest.fn(() => '1.0.0'),
  getBuildNumber: jest.fn(() => '1'),
  hasNotch: jest.fn(() => false),
  getDeviceId: jest.fn(() => 'test-device'),
  isTablet: jest.fn(() => false), // 👈 ADD THIS
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

jest.mock('react-native-video', () => {
  const React = require('react');
  const { View } = require('react-native');

  return props => <View {...props} testID="mock-video" />;
});
