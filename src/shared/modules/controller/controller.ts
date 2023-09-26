import {IController, ViewControllerDeps} from "./types";

export class BaseViewController<Deps extends ViewControllerDeps = ViewControllerDeps> implements IController {
  protected readonly _deps: Deps;

  constructor(deps: Deps) {
    this._deps = deps;
  }

  public init() {
    void this._deps.dataController.init();
  }

  public dispose() {
    this._deps.dataController.dispose();
  }
}
