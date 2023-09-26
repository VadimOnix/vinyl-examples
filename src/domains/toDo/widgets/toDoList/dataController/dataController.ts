import {IDataController} from "@/shared/modules/controller/types";
import {ToDoListDataControllerDeps} from "@/domains/toDo/widgets/toDoList/dataController/types";
import {EventBus} from "@/shared/modules/eventBus/eventBus";
import {Events, GlobalEvents, Reaction} from "@/shared/types/events";
import {makeAutoObservable, runInAction} from "mobx";
import {AddToDoRequestBody} from "@/domains/toDo/repository/types";
import {ToDoListHydrationData} from "@/domains/toDo/widgets/toDoList/types/types";
import {ToDo} from "@/shared/types/server";

export class ToDoListDataController implements IDataController<ToDoListHydrationData> {
  private _deps: ToDoListDataControllerDeps
  private _eventBus: EventBus<Events>
  private _reactions: Reaction[];

  constructor(deps: ToDoListDataControllerDeps) {
    this._deps = deps
    this._eventBus = EventBus.getInstance<Events>();

    this._toDos = []
    this._reactions = [];
    this._isFetching = false
    this._isAbleToDoList = false;

    makeAutoObservable(this)
  }

  private _isAbleToDoList: boolean;

  public get isAbleToDoList() {
    return this._isAbleToDoList
  }

  private _toDos: ToDo[];

  public get toDos() {
    return this._toDos
  }

  private _isFetching: boolean;

  public get isFetching() {
    return this._isFetching
  }

  init() {
    const token = this._deps.authService.getToken()
    if (token) {
      this._deps.toDoService.updateRepositoriesConfiguration({
        toDoRepositoryConfiguration: {token},
      })
      this._deps.authService.updateRepositoriesConfiguration({
        authRepositoryConfiguration: {token},
      })
      this._isAbleToDoList = true
    }
    this.subscribeOnEvents()
  }

  dispose() {
    this.unsubscribeEvents()
  }

  hydrate(hydrationData: ToDoListHydrationData) {
    this._toDos = hydrationData?.toDos
  }

  public async getToDos() {
    try {
      this._isFetching = true
      const toDos = await this._deps.toDoService.getToDos()
      runInAction(() => {
        this._toDos = toDos
      })
    } catch (error) {
      throw Error("Failed to fetch ToDo List")
    } finally {
      this._isFetching = false
    }
  }

  public async addNewToDo(params: AddToDoRequestBody) {
    try {
      this._isFetching = true
      const addedToDo = await this._deps.toDoService.addToDo(params)
      runInAction(() => {
        this._toDos.push(addedToDo)
      })
    } finally {
      runInAction(() => {
        this._isFetching = false
      })
    }
  }

  public toggleToDoById(id: number) {
    const foundToDo = this._toDos.find(toDo => toDo.id === id)
    if (foundToDo) {
      foundToDo.completed = !foundToDo?.completed
    }
  }

  public subscribeOnEvents() {
    this._reactions.push({
      key: GlobalEvents.AUTHENTICATION_WAS_SUCCESS,
      callback: this.onAuthSuccess.bind(this),
    });

    this._reactions.forEach((reaction) => {
      this._eventBus.on(reaction.key, reaction.callback);
    });
  }

  private async onAuthSuccess(args: Parameters<Events['authenticateWasSuccess']>[0]) {
    const {token} = args
    this._deps.toDoService.updateRepositoriesConfiguration({
      toDoRepositoryConfiguration: {token, headers: {}},
    })
    try {
      this._isFetching = true
      const toDos = await this._deps.toDoService.getToDos()
      runInAction(() => {
        this._toDos = toDos
        this._isAbleToDoList = true
      })
    } finally {
      runInAction(() => {
        this._isFetching = false
      })
    }
  }

  private unsubscribeEvents() {
    this._reactions.forEach((reaction) => {
      this._eventBus.off(reaction.key, reaction.callback);
    });
    this._reactions = []
  }
}
