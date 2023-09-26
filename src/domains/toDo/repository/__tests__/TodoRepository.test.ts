import {TodoRepository} from "@/domains/toDo/repository/TodoRepository";
import {InitialConfiguration} from "@/domains/toDo/repository/types";
import {RestDataProvider} from "@/shared/providers/RestDataProvider/RestDataProvider";

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


  // Can add a todo successfully
  it('should add a todo successfully when valid todo object is provided', async () => {
    // Arrange
    const todoRepository = new TodoRepository();
    const mockResponse = {
      data: {
        id: 1,
        title: 'Test Todo',
        description: 'Test Description',
        completed: false,
        userId: 1
      }
    };
    const mockPost = jest.spyOn(todoRepository['restDataProvider'], 'post').mockResolvedValue(mockResponse);

    // Act
    const todo = await todoRepository.addToDo({
      title: 'Test Todo',
      description: 'Test Description',
      completed: false
    });

    // Assert
    expect(mockPost).toHaveBeenCalledWith('/todo', {
      title: 'Test Todo',
      description: 'Test Description',
      completed: false
    });
    expect(todo).toEqual(mockResponse.data);
  });

  // Can get todos successfully
  it('should get todos successfully', async () => {
    // Arrange
    const todoRepository = new TodoRepository();
    const mockResponse = {
      data: [
        {
          id: 1,
          title: 'Test Todo 1',
          description: 'Test Description 1',
          completed: false,
          userId: 1
        },
        {
          id: 2,
          title: 'Test Todo 2',
          description: 'Test Description 2',
          completed: true,
          userId: 1
        }
      ]
    };
    const mockGet = jest.spyOn(todoRepository['restDataProvider'], 'get').mockResolvedValue(mockResponse);

    // Act
    const todos = await todoRepository.getToDos();

    // Assert
    expect(mockGet).toHaveBeenCalledWith('/todo/list');
    expect(todos).toEqual(mockResponse.data);
  });

  // Can update configuration successfully
  it('should update configuration successfully when valid configuration is provided', () => {
    // Arrange
    const todoRepository = new TodoRepository();
    const mockUpdateHeaders = jest.spyOn(todoRepository['restDataProvider'], 'updateHeaders');

    // Act
    todoRepository.updateConfiguration({
      token: 'testToken',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Assert
    expect(mockUpdateHeaders).toHaveBeenCalledWith({
      'Content-Type': 'application/json',
      Authorization: 'Bearer testToken'
    });
  });

  // Throws error if todo object is invalid
  it('should throw an error when invalid todo object is provided', async () => {
    // Arrange
    const todoRepository = new TodoRepository();

    // Act & Assert
    await expect(todoRepository.addToDo({})).rejects.toThrow('Invalid todo object');
  });

  // Throws error if configuration is invalid
  it('should throw an error when invalid configuration is provided', () => {
    // Arrange
    const todoRepository = new TodoRepository();

    // Act & Assert
    expect(() => {
      todoRepository.updateConfiguration({});
    }).toThrow('Invalid configuration');
  });

  // Throws error if baseUrl is invalid
  it('should throw an error when invalid baseUrl is provided', () => {
    // Arrange & Act & Assert
    expect(() => {
      new RestDataProvider({baseUrl: 'invalidUrl'});
    }).toThrow('Invalid baseUrl');
  });
});

