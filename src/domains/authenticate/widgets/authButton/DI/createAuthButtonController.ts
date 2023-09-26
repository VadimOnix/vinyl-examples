import {AuthButtonViewController} from "@/domains/authenticate/widgets/authButton/viewController/viewController";
import {AuthButtonDataController} from "@/domains/authenticate/widgets/authButton/dataController/dataController";
import {AuthService} from "@/shared/services/authService/authService";

export const createAuthButtonController = (hydrationData?: never) => {
  const dataController = new AuthButtonDataController({
    authService: new AuthService(),
  });
  const viewController = new AuthButtonViewController({dataController: dataController});

  if (hydrationData) {
    dataController.hydrate(hydrationData);
  }

  return viewController;
};
