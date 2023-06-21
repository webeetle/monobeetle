import {Knex} from "knex";
import IToDoRepository from "../core/interfaces/repositories/todo/IToDoRepository";


declare module 'fastify' {
  export interface FastifyInstance {
    mysql: Knex;
    ToDoRepository: IToDoRepository;
  }
}
