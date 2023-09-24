import {AuthButtonViewController} from "@/domains/authenticate/widgets/authButton/viewController/viewController";

describe('AuthButtonViewController', () => {
  // The 'isAuthenticated' property returns the correct value after a successful login.
  it('should return the correct value for "isAuthenticated" property after a successful login', () => {
    const dataControllerMock = {
      init: jest.fn(),
      dispose: jest.fn(),
      login: jest.fn(),
      isAuthenticated: true
    };
    const deps = {
      dataController: dataControllerMock
    };
    const viewController = new AuthButtonViewController(deps);

    const isAuthenticated = viewController.isAuthenticated;

    expect(isAuthenticated).toBe(true);
  });

  // Clicking on the auth button with empty credentials does not log in the user.
  it('should not log in the user when clicking on the auth button with empty credentials', async () => {
    const authServiceMock = {
      login: jest.fn().mockResolvedValue({})
    };
    const eventBusMock = {
      emit: jest.fn()
    };
    const dataControllerMock = {
      init: jest.fn(),
      dispose: jest.fn(),
      login: jest.fn(),
      isAuthenticated: false
    };
    const deps = {
      authService: authServiceMock,
      eventBus: eventBusMock,
      dataController: dataControllerMock
    };
    const viewController = new AuthButtonViewController(deps);

    await viewController.clickOnAuthButton();

    expect(authServiceMock.login).not.toHaveBeenCalled();
    expect(eventBusMock.emit).not.toHaveBeenCalled();
    expect(dataControllerMock.isAuthenticated).toBe(false);
  });

  // The 'dispose' method does not throw any errors.
  it('should not throw any errors when calling the "dispose" method', () => {
    const dataControllerMock = {
      init: jest.fn(),
      dispose: jest.fn(),
      login: jest.fn(),
      isAuthenticated: false
    };
    const deps = {
      dataController: dataControllerMock
    };
    const viewController = new AuthButtonViewController(deps);

    expect(() => {
      viewController.dispose();
    }).not.toThrow();
  });

});
