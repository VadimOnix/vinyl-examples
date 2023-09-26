import {TodoRepository} from "@/domains/toDo/repository/TodoRepository";
import {ToDoServiceConfiguration, ToDoServiceRepositories} from "./types";
import {AddToDoRequestBody} from "@/domains/toDo/repository/types";
import {ToDo} from "@/shared/types/server";

export class ToDoService {
  private readonly toDoRepository: TodoRepository;

  constructor(serviceConfiguration?: ToDoServiceConfiguration, repositories?: ToDoServiceRepositories) {
    if (repositories?.toDoRepository) {
      this.toDoRepository = repositories.toDoRepository;
    } else {
      this.toDoRepository = new TodoRepository(serviceConfiguration?.toDoRepositoryConfiguration);
    }
  }

  updateRepositoriesConfiguration(config: ToDoServiceConfiguration) {
    this.toDoRepository.updateConfiguration(config.toDoRepositoryConfiguration);
  }

  async addToDo(todo: AddToDoRequestBody): Promise<ToDo> {
    if (todo.title === undefined || todo.completed === undefined || todo.description === undefined) {
      throw new Error('Invalid todo object');
    }
    const response = await this.toDoRepository.addToDo(todo);
    return response;
  }

  async getToDos(): Promise<ToDo[]> {
    const response = await this.toDoRepository.getToDos();
    return response;
  }
}
