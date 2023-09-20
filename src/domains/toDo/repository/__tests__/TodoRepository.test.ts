import {TodoRepository} from "@/domains/toDo/repository/TodoRepository";
import {InitialConfiguration} from "@/domains/toDo/repository/types";
import {IRestDataProvider} from "@/shared/providers/RestDataProvider/types";

describe('TodoRepository', () => {

  // Can create a new instance of TodoRepository with default configuration.
  it('should create a new instance of TodoRepository with default configuration', () => {
    const todoRepository = new TodoRepository();
    expect(todoRepository).toBeInstanceOf(TodoRepository);
  });

  // Can create a new instance of TodoRepository with custom configuration.
  it('should create a new instance of TodoRepository with custom configuration', () => {
    const initialConfiguration = {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token'
      })
    } as unknown as InitialConfiguration;
    const todoRepository = new TodoRepository(initialConfiguration);
    expect(todoRepository).toBeInstanceOf(TodoRepository);
  });

  // Can add a new ToDo item.
  it('should add a new ToDo item', async () => {
    const todo = {
      todo: 'Buy groceries',
      completed: false,
      userId: 1
    };
    const response = {
      id: 1,
      todo: 'Buy groceries',
      completed: false,
      userId: 1
    };
    const restDataProviderMock = {
      post: jest.fn().mockResolvedValue(response)
    } as unknown as IRestDataProvider;
    const todoRepository = new TodoRepository(undefined, restDataProviderMock);
    const result = await todoRepository.addToDo(todo);
    expect(result).toEqual(response);
    expect(restDataProviderMock.post).toHaveBeenCalledWith('/todos/add', todo);
  });

  // Can get a ToDo item by id.
  it('should get a ToDo item by id', async () => {
    const id = 1;
    const response = {
      id: 1,
      todo: 'Buy groceries',
      completed: false,
      userId: 1
    };
    const restDataProviderMock = {
      get: jest.fn().mockResolvedValue(response)
    } as unknown as IRestDataProvider;
    const todoRepository = new TodoRepository(undefined, restDataProviderMock);
    const result = await todoRepository.getToDoById(id);
    expect(result).toEqual(response);
    expect(restDataProviderMock.get).toHaveBeenCalledWith(`/todos/${id}`);
  });
});
