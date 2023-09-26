import {AuthService} from "@/shared/services/authService/authService";
import {ToDoListDataController} from "@/domains/toDo/widgets/toDoList/dataController/dataController";
import {ToDoService} from "@/domains/toDo/service/ToDoService";
import {ToDoListViewController} from "@/domains/toDo/widgets/toDoList/viewController/viewController";
import {ToDoListHydrationData} from "@/domains/toDo/widgets/toDoList/types/types";

export const createToDoListController = (hydrationData?: ToDoListHydrationData) => {
  const dataController = new ToDoListDataController({
    authService: new AuthService(),
    toDoService: new ToDoService()
  });
  const viewController = new ToDoListViewController({dataController: dataController});

  if (hydrationData) {
    dataController.hydrate(hydrationData);
  }

  return viewController;
};
