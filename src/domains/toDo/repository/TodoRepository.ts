import {IRestDataProvider} from "@/shared/providers/RestDataProvider/types";
import {RestDataProvider} from "@/shared/providers/RestDataProvider/RestDataProvider";
import {AddToDoRequestBody, InitialConfiguration, TodoRepositoryConfiguration} from "./types";
import {ResponseData, ToDo} from "@/shared/types/server";

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
    if (!config.token && !config.headers) {
      throw new Error('Invalid configuration');
    }
    const {token, headers} = config;
    this.restDataProvider.updateHeaders({...headers, Authorization: `Bearer ${token}`});
  }

  async addToDo(todo: AddToDoRequestBody): Promise<ToDo> {
    try {
      if (todo.title === undefined || todo.completed === undefined) {
        throw new Error('Invalid todo object');
      }
      const response = await this.restDataProvider.post<ResponseData<ToDo>>('/todo', todo);
      return response.data!;
    } catch (error) {
      // handle error
      console.error(error);
      throw error;
    }
  }

  async getToDos(): Promise<ToDo[]> {
    try {
      const response = await this.restDataProvider.get<ResponseData<ToDo[]>>('/todo/list');
      return response.data!;
    } catch (error) {
      // handle error
      console.error(error);
      throw error;
    }
  }
}


