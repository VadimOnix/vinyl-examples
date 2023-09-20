import {AuthenticateRepository} from "@/shared/repositories/Authenticate/AuthenticateRepository";
import {IRestDataProvider} from "@/shared/providers/RestDataProvider/types";

describe('AuthenticateRepository', () => {

  // Authenticate a user with correct credentials
  it('should authenticate a user with correct credentials', async () => {
    // Arrange
    const authInfo = {
      username: 'correctUsername',
      password: 'correctPassword'
    };
    const expectedResponse = {
      id: 1,
      username: 'correctUsername',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      image: 'profile.jpg',
      token: 'validToken'
    };
    const restDataProviderMock = {
      post: jest.fn().mockResolvedValue(expectedResponse)
    } as unknown as IRestDataProvider;
    const authenticateRepository = new AuthenticateRepository(undefined, restDataProviderMock);

    // Act
    const result = await authenticateRepository.login(authInfo);

    // Assert
    expect(result).toEqual(expectedResponse);
    expect(restDataProviderMock.post).toHaveBeenCalledWith('/auth/login', authInfo);
  });

  // Update configuration with valid token and headers
  it('should update configuration with valid token and headers', () => {
    // Arrange
    const token = 'validToken';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    const restDataProviderMock = {
      updateHeaders: jest.fn()
    } as unknown as IRestDataProvider;
    const authenticateRepository = new AuthenticateRepository(undefined, restDataProviderMock);

    // Act
    authenticateRepository.updateConfiguration({ token, headers });

    // Assert
    expect(restDataProviderMock.updateHeaders).toHaveBeenCalledWith(headers);
  });

  // Authenticate a user after login with correct token
  it('should authenticate a user after login with correct token', async () => {
    // Arrange
    const token = 'validToken';
    const expectedResponse = {
      id: 1,
      username: 'correctUsername',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      image: 'profile.jpg',
      token: 'validToken'
    };
    const restDataProviderMock = {
      post: jest.fn().mockResolvedValue(expectedResponse)
    } as unknown as IRestDataProvider;
    const authenticateRepository = new AuthenticateRepository(undefined, restDataProviderMock);

    // Act
    const result = await authenticateRepository.me(token);

    // Assert
    expect(result).toEqual(expectedResponse);
    expect(restDataProviderMock.post).toHaveBeenCalledWith('/auth/login', { token });
  });
});
