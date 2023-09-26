import {BaseViewController} from "@/shared/modules/controller/controller";
import {ToDoListViewControllerDeps} from "@/domains/toDo/widgets/toDoList/viewController/types";
import {makeClassAutoObservable, Overrides} from "@/shared/modules/mobx/mobxAutoObservable";
import {runInAction} from "mobx";

export class ToDoListViewController extends BaseViewController<ToDoListViewControllerDeps> {
  constructor(deps: ToDoListViewControllerDeps) {
    super(deps);

    this._inputDescriptionValue = '';
    this._inputTitleValue = '';

    makeClassAutoObservable(this, {
      _deps: false,
    } as Overrides<this & { _deps: ToDoListViewControllerDeps }>);
  }


  private _inputDescriptionValue: string;

  public get inputDescriptionValue() {
    return this._inputDescriptionValue
  }

  private _inputTitleValue: string;

  public get inputTitleValue() {
    return this._inputTitleValue
  }

  public get isFetching() {
    return this._deps.dataController.isFetching
  }

  public get toDos() {
    return this._deps.dataController.toDos
  }

  public changeInputDescriptionValue(value: string) {
    this._inputDescriptionValue = value
  }

  public changeInputTitleValue(value: string) {
    this._inputTitleValue = value
  }

  public clickOnResetButton() {
    this.clearInputValues()
  }

  public clickOnCheckButton(toDoId: number) {
    this._deps.dataController.toggleToDoById(toDoId)
  }

  public get isAbleToDoList() {
    return this._deps.dataController.isAbleToDoList;
  }

  public async clickOnAddButton() {
    await this._deps.dataController.addNewToDo({
      description: this._inputDescriptionValue,
      completed: false,
      title: this._inputTitleValue
    })
    runInAction(() => {
      this.clearInputValues()
    })
  }

  private clearInputValues() {
    this._inputDescriptionValue = ''
    this._inputTitleValue = ''
  }
}
