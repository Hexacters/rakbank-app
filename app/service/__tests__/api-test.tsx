import { API } from './../api-service'; // Assuming api-service.js is the file containing the service

describe('API Service', () => {
  it('should return the base URL for users endpoint', () => {
    expect(API.USERS()).toBe('http://localhost:8080/users');
  });

  it('should return the URL for a specific user', () => {
    const userId = 123;
    expect(API.USERS(userId)).toBe('http://localhost:8080/users/123');
  });
});