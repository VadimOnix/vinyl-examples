import {AuthButtonDataController} from "@/domains/authenticate/widgets/authButton/dataController/dataController";
import {AuthButtonDataControllerDeps} from "@/domains/authenticate/widgets/authButton/dataController/types";

describe('AuthButtonDataController', () => {

  // Login with valid credentials sets isAuthenticated to true and emits authenticateWasSuccess event.
  it('should set isAuthenticated to true and emit authenticateWasSuccess event when login with valid credentials', async () => {
    // Mock dependencies
    const authServiceMock = {
      login: jest.fn().mockResolvedValue({token: 'validToken'})
    };
    const eventBusMock = {
      emit: jest.fn()
    };

    // Create instance of AuthButtonDataController with mocked dependencies
    const dataController = new AuthButtonDataController({
      authService: authServiceMock
    });
    dataController['_eventBus'] = eventBusMock;

    // Call login method with valid credentials
    await dataController.login({username: 'validUsername', password: 'validPassword'});

    // Check that isAuthenticated is set to true
    expect(dataController.isAuthenticated).toBe(true);

    // Check that authenticateWasSuccess event is emitted with correct token
    expect(eventBusMock.emit).toHaveBeenCalledWith('authenticateWasSuccess', {token: 'validToken'});
  });

  // Widget can be initialized successfully.
  it('should initialize the widget successfully', () => {
    // Create instance of AuthButtonDataController
    const dataController = new AuthButtonDataController({} as AuthButtonDataControllerDeps);

    // Call init method
    dataController.init();

    // No assertions needed, just check that no errors are thrown
  });

  // Widget does not need to be disposed.
  it('should not need to dispose the widget', () => {
    // Create instance of AuthButtonDataController
    const dataController = new AuthButtonDataController({} as AuthButtonDataControllerDeps);

    // Call dispose method
    dataController.dispose();

    // No assertions needed, just check that no errors are thrown
  });

  // Login with invalid credentials does not set isAuthenticated to true and does not emit authenticateWasSuccess event.
  it('should not set isAuthenticated to true and not emit authenticateWasSuccess event when login with invalid credentials', () => {
    // Mock dependencies
    const authServiceMock = {
      login: jest.fn().mockResolvedValue({token: null})
    };
    const eventBusMock = {
      emit: jest.fn()
    };

    // Create instance of AuthButtonDataController with mocked dependencies
    const dataController = new AuthButtonDataController({
      authService: authServiceMock
    });
    dataController['_eventBus'] = eventBusMock;

    // Call login method with invalid credentials
    dataController.login({username: 'invalidUsername', password: 'invalidPassword'});

    // Check that isAuthenticated is not set to true
    expect(dataController.isAuthenticated).toBe(false);

    // Check that authenticateWasSuccess event is not emitted
    expect(eventBusMock.emit).not.toHaveBeenCalledWith('authenticateWasSuccess', expect.anything());
  });

  // Login from server side throws an error.
  it('should throw an error when login from server side', async () => {
    // Mock dependencies
    const authServiceMock = {
      login: jest.fn().mockRejectedValue(new Error('You can\'t login from server side'))
    };

    // Create instance of AuthButtonDataController with mocked dependencies
    const dataController = new AuthButtonDataController({
      authService: authServiceMock
    });

    // Call login method from server side
    await expect(dataController.login({
      username: 'validUsername',
      password: 'validPassword'
    })).rejects.toThrowError('You can\'t login from server side');
  });

  // Widget does not support hydration.
  it('should not support hydration', () => {
    const logSpy = jest.spyOn(console, 'warn')
    // Create instance of AuthButtonDataController
    const dataController = new AuthButtonDataController({} as AuthButtonDataControllerDeps);
    dataController.hydrate()
    // Call hydrate method
    expect(logSpy).toHaveBeenCalledWith('This widget does not support hydration.');
  });

});
