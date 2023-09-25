import {AuthenticateRepository} from "@/shared/repositories/Authenticate/AuthenticateRepository";

describe('AuthenticateRepository', () => {

  // Login with valid credentials returns a token
  it('should return a token when logging in with valid credentials', async () => {
    // Arrange
    const authInfo = {
      login: 'validLogin',
      password: 'validPassword'
    };
    const expectedToken = 'validToken';
    const restDataProviderMock = {
      post: jest.fn().mockResolvedValue({ data: { token: expectedToken } })
    };
    const authenticateRepository = new AuthenticateRepository(undefined, restDataProviderMock);

    // Act
    const result = await authenticateRepository.login(authInfo);

    // Assert
    expect(result.token).toEqual(expectedToken);
  });

  // Me returns user information
  it('should return user information when calling me', async () => {
    // Arrange
    const expectedUser = {
      id: 1,
      login: 'testUser',
      password: 'testPassword'
    };
    const restDataProviderMock = {
      post: jest.fn().mockResolvedValue({ data: expectedUser })
    };
    const authenticateRepository = new AuthenticateRepository(undefined, restDataProviderMock);

    // Act
    const result = await authenticateRepository.me();

    // Assert
    expect(result).toEqual(expectedUser);
    expect(restDataProviderMock.post).toHaveBeenCalledWith('/profile/me', {});
  });

  // Update configuration updates headers with token
  it('should update headers with token when updating configuration', () => {
    // Arrange
    const token = 'testToken';
    const headers = { 'Content-Type': 'application/json' };
    const restDataProviderMock = {
      updateHeaders: jest.fn()
    };
    const authenticateRepository = new AuthenticateRepository(undefined, restDataProviderMock);

    // Act
    authenticateRepository.updateConfiguration({ token, headers });

    // Assert
    expect(restDataProviderMock.updateHeaders).toHaveBeenCalledWith({ ...headers, Authorization: `Bearer ${token}` });
  });
});
