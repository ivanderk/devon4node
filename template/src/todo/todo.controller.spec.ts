import { HttpException } from '@nestjs/common';
import { Todo, TodoDTO, TodoLevel, TodoParams } from './models';
import { TodoController } from './todo.controller';
import { TodoRepository } from './todo.repository';
import { TodoService } from './todo.service';

describe('Todo Controller UnitTests', () => {
  let controller: TodoController;
  let service: TodoService;
  let repo: TodoRepository;
  beforeEach(async () => {
    repo = new TodoRepository();
    service = new TodoService(repo);
    controller = new TodoController(service);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getTodos', async () => {
    const result: TodoDTO[] = [
      {
        description: 'Todo created',
        priority: TodoLevel.Normal,
        completed: false,
        createdAt: undefined,
        updatedAt: undefined,
      },
    ];
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async () => result as Todo[]);
    expect(await controller.getTodos()).toEqual(result);
  });

  it('Creating Todo', async () => {
    const result: TodoDTO = {
      description: 'Todo created',
      priority: TodoLevel.Normal,
      completed: false,
    };
    let input: TodoParams = {
      description: 'Todo created',
    };
    jest
      .spyOn(service, 'createTodo')
      .mockImplementation(async () => result as Todo);
    expect(await controller.create(input)).toEqual(result);
    input = { description: '   ' };
    await controller
      .create(input)
      .catch(error => expect(error).toBeInstanceOf(HttpException));
    await controller
      .create(input)
      .catch(error => expect(error).toBeInstanceOf(HttpException));
  });

  it('Updating Todo', async () => {
    const updated: TodoDTO = {
      id: 1,
      description: 'Todo updated',
      priority: TodoLevel.Normal,
      completed: false,
      createdAt: undefined,
      updatedAt: undefined,
    };
    const result: TodoDTO = {
      id: 1,
      description: 'Todo updated',
      priority: TodoLevel.Normal,
      completed: false,
      createdAt: undefined,
      updatedAt: undefined,
    };
    let input: TodoDTO = {
      id: 1,
      description: 'Todo updated',
      priority: TodoLevel.Normal,
      completed: false,
      createdAt: undefined,
      updatedAt: undefined,
    };
    jest
      .spyOn(service, 'update')
      .mockImplementation(async () => updated as Todo);
    expect(await controller.update(input)).toEqual(result);
    input = {
      priority: TodoLevel.Normal,
      description: 'Todo updated',
      completed: false,
    };
    await controller
      .update(input)
      .catch(error => expect(error).toBeInstanceOf(HttpException));
    await controller
      .update(input)
      .catch(error => expect(error).toBeInstanceOf(HttpException));
  });

  it('Deleting Todo', async () => {
    const deleted: TodoDTO = {
      id: 1,
      description: 'Todo updated',
      priority: TodoLevel.Normal,
      completed: false,
      createdAt: undefined,
      updatedAt: undefined,
    };
    const result: TodoDTO = {
      id: 1,
      description: 'Todo updated',
      priority: TodoLevel.Normal,
      completed: false,
      createdAt: undefined,
      updatedAt: undefined,
    };
    const input: TodoDTO = {
      id: 1,
      description: 'Todo updated',
      priority: TodoLevel.Normal,
      completed: false,
      createdAt: undefined,
      updatedAt: undefined,
    };
    jest
      .spyOn(service, 'findById')
      .mockImplementation(async () => deleted as Todo);
    jest
      .spyOn(service, 'deleteById')
      .mockImplementation(async () => deleted as Todo);
    expect(await controller.delete(input.id!)).toEqual(result);
    jest.spyOn(service, 'findById').mockImplementation(async () => undefined);
    await controller
      .delete(0)
      .catch(error => expect(error).toBeInstanceOf(HttpException));
    await controller
      .delete(132123)
      .catch(error => expect(error).toBeInstanceOf(HttpException));
  });
});
