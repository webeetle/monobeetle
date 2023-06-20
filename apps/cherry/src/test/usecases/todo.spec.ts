import {build, prepareDB} from "../helper";
import {deleteToDo, getAllTodos, getToDoById, insertToDo, updateToDo} from "../../core/usecases/todo/todoUseCases";
import {ToDo, ToDoToInsert} from "../../core/entities/todo/ToDo";
import {Knex} from "knex";
import {FastifyInstance} from "fastify";


describe('To Do test suite', () => {

  let fastify: FastifyInstance;

  beforeEach(async () => {
    fastify = await build();
    await prepareDB(fastify)
  });

  it('get all todos', async () => {
    const toDos: ToDo[] = await getAllTodos(fastify)
    expect(toDos.length).toEqual(3)
  });

  it('get todo by id', async () => {
    const toDo = await getToDoById(fastify, 'todo1')
    expect(toDo.id).toEqual('todo1')
  });

  it('insert new todo', async () => {
    const toDo: ToDoToInsert = {
      description: 'test',
      done: false
    }
    const id = await insertToDo(fastify, toDo)
    expect(id).toBeTruthy()
    const toDoInserted = await getToDoById(fastify, id)
    expect(toDoInserted).toBeTruthy()
    expect(toDoInserted?.description).toEqual(toDo.description)
    expect(toDoInserted?.done).toBeFalsy()
  });

  it('update todo', async () => {
    const toDo: ToDoToInsert = {
      description: 'test',
      done: false
    }
    const id = await insertToDo(fastify, toDo)
    expect(id).toBeTruthy()
    await updateToDo(fastify, id, {done: true, description: 'test2'})
    const toDoUpdated = await getToDoById(fastify, id)
    expect(toDoUpdated).toBeTruthy()
    expect(toDoUpdated?.description).toEqual('test2')
    expect(toDoUpdated?.done).toBeTruthy()
  })

  it('delete todo', async () => {
    const toDo: ToDoToInsert = {
      description: 'test',
      done: false
    }
    const id = await insertToDo(fastify, toDo)
    expect(id).toBeTruthy()
    await deleteToDo(fastify, id)
    const toDoDeleted = await getToDoById(fastify, id)
    expect(toDoDeleted).toBeFalsy()
  })
});
