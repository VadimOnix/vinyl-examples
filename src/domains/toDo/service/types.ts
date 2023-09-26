import {TodoRepository} from "@/domains/toDo/repository/TodoRepository";
import {TodoRepositoryConfiguration} from "@/domains/toDo/repository/types";

export type ToDoServiceConfiguration = {
  toDoRepositoryConfiguration: TodoRepositoryConfiguration
}

export type ToDoServiceRepositories = {
  toDoRepository?: TodoRepository
}
