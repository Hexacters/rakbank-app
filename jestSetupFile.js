jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
    require('@react-native-google-signin/google-signin/jest/build/jest/setup.js')
  );