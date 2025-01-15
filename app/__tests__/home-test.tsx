import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '@/app/(tabs)/home';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('@/components/HelloWave', () => 'HelloWave');
jest.mock('@/components/ParallaxScrollView', () => 'ParallaxScrollView');
jest.mock('@/components/ThemedText', () => 'ThemedText');
jest.mock('@/components/ThemedView', () => 'ThemedView');


describe('HomeScreen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({ name: 'Test User' })
    );

    const { getByText } = render(<HomeScreen />);

    // Check for static text
    expect(getByText('Successfully Submitted!')).toBeTruthy();
    expect(
      getByText('Our representative will get in touch with you shortly')
    ).toBeTruthy();

    // Ensure `AsyncStorage` is called
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('userDetails');
    });
  });

  it('renders default state if AsyncStorage has no data', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const { getByText } = render(<HomeScreen />);

    // Check for static text
    expect(getByText('Successfully Submitted!')).toBeTruthy();

    // Ensure `AsyncStorage` is called
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('userDetails');
    });
  });

  it('renders images correctly', () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText('rakbank')).toBeTruthy(); // Replace with alt-text for images, if provided.
    expect(getByText('success')).toBeTruthy();
  });
});
