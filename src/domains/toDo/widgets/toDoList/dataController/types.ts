import {AuthService} from "@/shared/services/authService/authService";
import {ToDoService} from "@/domains/toDo/service/ToDoService";

export type ToDoListDataControllerDeps = {
  authService: AuthService
  toDoService: ToDoService
}
