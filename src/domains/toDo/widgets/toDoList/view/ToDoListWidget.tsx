import {withWidgetControllers} from "@/domains/toDo/widgets/toDoList/DI/DI";
import {createToDoListController} from "@/domains/toDo/widgets/toDoList/DI/createToDoListController";
import {ToDoList} from "@/domains/toDo/widgets/toDoList/view/ToDoList.client";

const ToDoListComponent = () => {
  return (<ToDoList/>)
}

export const ToDoListWidget = withWidgetControllers(createToDoListController)(ToDoListComponent);
ToDoListWidget.widgetName = 'toDoList';
