import {IRestDataProvider} from "@/shared/providers/RestDataProvider/types";
import {RestDataProvider} from "@/shared/providers/RestDataProvider/RestDataProvider";
import {AddToDoRequestBody, InitialConfiguration, ToDo, TodoRepositoryConfiguration} from "./types";


export class TodoRepository {
  private readonly restDataProvider: IRestDataProvider;

  constructor(initialConfiguration?: InitialConfiguration, dataProvider?: IRestDataProvider) {
    if (dataProvider) {
      this.restDataProvider = dataProvider;
    } else {
      this.restDataProvider = new RestDataProvider({
        initialHeaders: initialConfiguration?.headers
      });
    }
  }

  /**
   * Updates the configuration of the repository.
   * @param config - The configuration object.
   */
  public updateConfiguration(config: TodoRepositoryConfiguration) {
    if (!config.token || !config.headers) {
      throw new Error('Invalid configuration');
    }
    const {token, headers} = config;
    this.restDataProvider.updateHeaders({...headers, Authorization: `Bearer ${token}`});
  }

  async addToDo(todo: AddToDoRequestBody): Promise<ToDo> {
    if (todo.todo === undefined || todo.completed === undefined || todo.userId === undefined) {
      throw new Error('Invalid todo object');
    }
    const response = await this.restDataProvider.post<ToDo>('/todos/add', todo);
    return response;
  }

  async getToDoById(id: number): Promise<ToDo> {
    if (typeof id !== 'number') {
      throw new Error('Invalid id');
    }
    const response = await this.restDataProvider.get<ToDo>(`/todos/${id}`);
    return response;
  }

  async getAllToDo(): Promise<ToDo[]> {
    try {
      const response = await this.restDataProvider.get<ToDo[]>('/todos');
      return response;
    } catch (error) {
      // handle error
      console.error(error);
      throw error;
    }
  }
}
