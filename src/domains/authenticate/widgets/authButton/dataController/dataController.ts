import {IDataController} from "@/shared/modules/controller/types";
import {AuthButtonDataControllerDeps} from "./types";
import {EventBus} from "@/shared/modules/eventBus/eventBus";
import {makeAutoObservable, runInAction} from "mobx";
import {LoginRequestBody} from "@/shared/repositories/Authenticate/types";
import {AuthButtonHydrationData} from "@/domains/authenticate/widgets/authButton/types/types";
import {Events, GlobalEvents} from "@/shared/types/events";

export class AuthButtonDataController implements IDataController<AuthButtonHydrationData> {
  private readonly _deps: AuthButtonDataControllerDeps;
  private readonly _eventBus: EventBus<Events>;
  private _isAuthenticated: boolean;

  constructor(deps: AuthButtonDataControllerDeps) {
    this._deps = deps;
    this._eventBus = EventBus.getInstance<Events>();

    this._isAuthenticated = false;

    makeAutoObservable(this)
  }

  init() {
    console.info('Widget has been initialized successfully and is ready to use.');
  }

  dispose() {
    console.info('This widget does not need to be disposed.');
  }

  hydrate(hydrationData?: never): void {
    console.warn('This widget does not support hydration.');
  }

  public get isAuthenticated() {
    return this._isAuthenticated
  }

  public async login(authInfo: LoginRequestBody) {
    const user = await this._deps.authService.login(authInfo)
    if (user.token) {
      this._eventBus.emit(GlobalEvents.AUTHENTICATION_WAS_SUCCESS, {
        token: user.token
      })
      runInAction(() => {
        this._isAuthenticated = true
      })
    }
  }
}

EventBus.getInstance<Events>().on(GlobalEvents.AUTHENTICATION_WAS_SUCCESS, (args) => {
  console.log(args)
})
