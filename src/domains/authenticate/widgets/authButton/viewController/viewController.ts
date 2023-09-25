import {BaseViewController} from "@/shared/modules/controller/controller";
import {AuthButtonViewControllerDeps} from "./types";
import {makeClassAutoObservable, Overrides} from "@/shared/modules/mobx/mobxAutoObservable";
import {LOGIN, PASSWORD} from "./constants";

export class AuthButtonViewController extends BaseViewController<AuthButtonViewControllerDeps> {
  constructor(deps: AuthButtonViewControllerDeps) {
    super(deps);

    makeClassAutoObservable(this, {
      _deps: false,
    } as Overrides<this & { _deps: AuthButtonViewControllerDeps }>);
  }

  public get isAuthenticated() {
    return this._deps.dataController.isAuthenticated
  }

  public async clickOnAuthButton() {
    await this._deps.dataController.login({
      login: LOGIN,
      password: PASSWORD
    })
  }
}
