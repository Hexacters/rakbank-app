import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Index from '../index'; // Replace with the actual path to your component
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { API } from '../service/api-service'; // Assuming API is imported from api-service.js

jest.mock('@react-native-google-signin/google-signin');
jest.mock('@react-native-async-storage/async-storage');
jest.mock('axios');
jest.mock('../service/api-service'); // Mock API.USERS if necessary

describe('Index Screen - handleSignup', () => {
  let mockAsyncStorage: any;
  let mockAxios: any;
  let mockRouter: any;

  beforeEach(() => {
    mockAsyncStorage = {
      setItem: jest.fn(),
    };
    mockAxios = {
      post: jest.fn(),
    };
    mockRouter = { navigate: jest.fn() };
    AsyncStorage.setItem = mockAsyncStorage.setItem;
    axios.post = mockAxios.post;
    API.USERS = jest.fn(); // Mock API.USERS if necessary
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('stores form data in AsyncStorage on successful signup', async () => {
    const formData = { name: 'John Doe', email: 'johndoe@example.com', password: 'securepassword' };
    mockAxios.post.mockResolvedValueOnce({ data: {} }); // Simulate successful API response

    const { getByText } = render(<Index />);

    // Simulate form input and submit
    fireEvent.changeText(getByText('Name'), formData.name);
    fireEvent.changeText(getByText('Email'), formData.email);
    fireEvent.changeText(getByText('Password'), formData.password);
    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('userDetails', JSON.stringify(formData));
    });
  });

  it('navigates to home screen on successful signup', async () => {
    mockAxios.post.mockResolvedValueOnce({ data: {} }); // Simulate successful API response

    const { getByText } = render(<Index />);

    // Simulate form input and submit
    fireEvent.changeText(getByText('Name'), 'John Doe');
    fireEvent.changeText(getByText('Email'), 'johndoe@example.com');
    fireEvent.changeText(getByText('Password'), 'securepassword');
    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(mockRouter.navigate).toHaveBeenCalledWith('/(tabs)/home');
    });
  });

  it('sets error state on failed signup', async () => {
    mockAxios.post.mockRejectedValueOnce(new Error('Signup failed')); // Simulate failed API response

    const { getByText } = render(<Index />);

    // Simulate form input and submit
    fireEvent.changeText(getByText('Name'), 'John Doe');
    fireEvent.changeText(getByText('Email'), 'johndoe@example.com');
    fireEvent.changeText(getByText('Password'), 'securepassword');
    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(getByText('Please check all the details are valid')).toBeTruthy();
    });
  });

  it('stores form data in AsyncStorage and navigates to home on successful signup (mocked)', async () => {
    const formData = { name: 'John Doe', email: 'johndoe@example.com', password: 'securepassword' };
    mockAxios.post.mockResolvedValueOnce({ data: {} }); // Simulate successful API response

    const { getByText } = render(<Index />);

    // Simulate form input and submit
    fireEvent.changeText(getByText('Name'), formData.name);
    fireEvent.changeText(getByText('Email'), formData.email);
    fireEvent.changeText(getByText('Password'), formData.password);
    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('userDetails', JSON.stringify(formData));
      expect(mockRouter.navigate).toHaveBeenCalledWith('/(tabs)/home');
    });
  });

  it('sets error state and does not navigate on failed signup (mocked)', async () => {
    const formData = { name: 'John Doe', email: 'johndoe@example.com', password: 'short' }; // Password less than 8 characters
    mockAxios.post.mockRejectedValueOnce(new Error('Signup failed')); // Simulate failed API response

    const { getByText, queryByText } = render(<Index />);

    // Simulate form input and submit
    fireEvent.changeText(getByText('Name'), formData.name);
    fireEvent.changeText(getByText('Email'), formData.email);
    fireEvent.changeText(getByText('Password'), formData.password);
    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(mockAsyncStorage.setItem).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalledWith('/(tabs)/home');
      expect(queryByText('Someting went wrong please check the connection')).toBeTruthy(); // Assuming error message text
    });
  });

  // Add more test cases for edge cases, e.g., empty form data, network errors
});