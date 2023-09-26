import {AuthService} from "@/shared/services/authService/authService";
import {ToDoService} from "@/domains/toDo/service/ToDoService";
import {ToDoListDataController} from "@/domains/toDo/widgets/toDoList/dataController/dataController";

describe('ToDoListDataController', () => {

  // can instantiate ToDoListDataController with dependencies
  it('should instantiate ToDoListDataController with dependencies', () => {
    // Arrange
    const authService = new AuthService();
    const toDoService = new ToDoService();
    const deps = {authService, toDoService};

    // Act
    const dataController = new ToDoListDataController(deps);

    // Assert
    expect(dataController).toBeInstanceOf(ToDoListDataController);
  });

  // can hydrate ToDoListDataController with ToDoListHydrationData
  it('should hydrate ToDoListDataController with ToDoListHydrationData', () => {
    // Arrange
    const dataController = new ToDoListDataController({});
    const hydrationData = {toDos: [{id: 1, title: 'Task 1', description: 'Description 1', completed: false, userId: 1}]};

    // Act
    dataController.hydrate(hydrationData);

    // Assert
    expect(dataController.toDos).toEqual(hydrationData.toDos);
  });

  // can get toDos from ToDoListDataController
  it('should get toDos from ToDoListDataController', () => {
    // Arrange
    const dataController = new ToDoListDataController({});
    const toDos = [{id: 1, title: 'Task 1', description: 'Description 1', completed: false, userId: 1}];
    dataController.hydrate({toDos});

    // Act
    const result = dataController.toDos;

    // Assert
    expect(result).toEqual(toDos);
  });
});
