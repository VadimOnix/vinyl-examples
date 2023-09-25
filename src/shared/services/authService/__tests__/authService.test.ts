import {AuthService} from "@/shared/services/authService/authService";
import {AuthenticateRepository} from "@/shared/repositories/Authenticate/AuthenticateRepository";


describe('AuthService', () => {

  describe('server side', () => {
    const {window} = global;

    beforeEach(() => {
      // @ts-ignore
      delete global.window;
    });
    afterEach(() => {
      global.window = window;
    });
    // getToken returns token from cookies when running on server side
    it('should return token from cookies when running on server side', () => {

      const authService = new AuthService();
      const getTokenFromCookiesSpy = jest.spyOn(authService.authenticateRepository, 'getTokenFromCookies').mockReturnValue('token');
      const getTokenFromLocalStorageSpy = jest.spyOn(authService.authenticateRepository, 'getTokenFromLocalStorage').mockReturnValue(null);
      const ctx = {req: {cookies: {token: 'token'}}};
      const token = authService.getToken(ctx);
      expect(token).toBe('token');
      expect(getTokenFromCookiesSpy).toHaveBeenCalledWith(ctx.req.cookies);
      expect(getTokenFromLocalStorageSpy).not.toHaveBeenCalled();
    });
  })

  // Can create an instance of AuthService
  it('should create an instance of AuthService', () => {
    const authService = new AuthService();
    expect(authService).toBeInstanceOf(AuthService);
  });

  // Can call getToken method from client side
  it('should call getToken method from client side', () => {
    const authService = new AuthService();
    const getTokenFromLocalStorageSpy = jest.spyOn(authService.authenticateRepository, 'getTokenFromLocalStorage');
    authService.getToken();
    expect(getTokenFromLocalStorageSpy).toHaveBeenCalled();
  });

  // Can call login method from client side
  it('should call login method from client side', async () => {
    global.fetch = jest.fn()
    const authService = new AuthService();
    const loginSpy = jest.spyOn(authService.authenticateRepository, 'login').mockImplementation(async () => {
      return {
        token: 'token'
      }
    });
    const setTokenToLocalStorageSpy = jest.spyOn(authService.authenticateRepository, 'setTokenToLocalStorage');
    const authInfo = {username: 'test', password: 'password'};
    await authService.login(authInfo);
    expect(loginSpy).toHaveBeenCalledWith(authInfo);
    expect(setTokenToLocalStorageSpy).toHaveBeenCalled();
  });


  // getToken returns token from local storage when running on client side
  it('should return token from local storage when running on client side', () => {
    const authService = new AuthService();
    const getTokenFromCookiesSpy = jest.spyOn(authService.authenticateRepository, 'getTokenFromCookies').mockReturnValue(null);
    const getTokenFromLocalStorageSpy = jest.spyOn(authService.authenticateRepository, 'getTokenFromLocalStorage').mockReturnValue('token');
    const token = authService.getToken();
    expect(token).toBe('token');
    expect(getTokenFromCookiesSpy).not.toHaveBeenCalled();
    expect(getTokenFromLocalStorageSpy).toHaveBeenCalled();
  });

  describe('constructor', () => {

    // When called with no arguments, it should create an instance of AuthService with default values.
    it('should create an instance of AuthService with default values when called with no arguments', () => {
      const authService = new AuthService();
      expect(authService).toBeInstanceOf(AuthService);
      expect(authService['authenticateRepository']).toBeInstanceOf(AuthenticateRepository);
    });

    // When called with a service configuration and repositories, it should create an instance of AuthService with the provided values.
    it('should create an instance of AuthService with the provided values when called with a service configuration and repositories', () => {
      const serviceConfiguration = {
        authRepositoryConfiguration: {
          token: 'testToken',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      };
      const repositories = {
        authRepository: new AuthenticateRepository()
      };
      const authService = new AuthService(serviceConfiguration, repositories);
      expect(authService).toBeInstanceOf(AuthService);
      expect(authService['authenticateRepository']).toBe(repositories.authRepository);
    });

    // When called with a repositories object that has an authRepository property, it should create an instance of AuthService with the provided authRepository.
    it('should create an instance of AuthService with the provided authRepository when called with a repositories object that has an authRepository property', () => {
      const repositories = {
        authRepository: new AuthenticateRepository()
      };
      const authService = new AuthService(undefined, repositories);
      expect(authService).toBeInstanceOf(AuthService);
      expect(authService['authenticateRepository']).toBe(repositories.authRepository);
    });

    // When called with a service configuration but no repositories, it should create an instance of AuthService with a default authRepository.
    it('should create an instance of AuthService with a default authRepository when called with a service configuration but no repositories', () => {
      const serviceConfiguration = {
        authRepositoryConfiguration: {
          token: 'testToken',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      };
      const authService = new AuthService(serviceConfiguration);
      expect(authService).toBeInstanceOf(AuthService);
      expect(authService['authenticateRepository']).toBeInstanceOf(AuthenticateRepository);
    });

    // When called with a repositories object that has an authRepository property but the value is null or undefined, it should create an instance of AuthService with a default authRepository.
    it('should create an instance of AuthService with a default authRepository when called with a repositories object that has an authRepository property but the value is null or undefined', () => {
      const repositories = {
        authRepository: null
      };
      //@ts-ignore
      const authService = new AuthService(undefined, repositories);
      expect(authService).toBeInstanceOf(AuthService);
      expect(authService['authenticateRepository']).toBeInstanceOf(AuthenticateRepository);
    });

    // When called with a repositories object that has an authRepository property, it should use the provided authRepository instead of creating a new one.
    it('should use the provided authRepository instead of creating a new one when called with a repositories object that has an authRepository property', () => {
      const existingAuthRepository = new AuthenticateRepository();
      const repositories = {
        authRepository: existingAuthRepository
      };
      const authService = new AuthService(undefined, repositories);
      expect(authService).toBeInstanceOf(AuthService);
      expect(authService['authenticateRepository']).toBe(existingAuthRepository);
    });
  })
});
