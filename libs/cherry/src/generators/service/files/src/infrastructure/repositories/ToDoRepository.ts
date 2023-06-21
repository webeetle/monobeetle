import ToDoSQLAdapter from "../adapters/ToDoSQLAdapter";
import {FastifyInstance} from "fastify";
import fp from "fastify-plugin";
import IToDoRepository from "../../core/interfaces/repositories/todo/IToDoRepository";

class ToDoRepository extends ToDoSQLAdapter {
  constructor(container: FastifyInstance) {
    super(container);
  }
}

// Use Fastify as IoC container to inject dependencies
export default fp(async function (fastify: FastifyInstance) {
  fastify.decorate('ToDoRepository', new ToDoRepository(fastify));
});

declare module 'fastify' {
  export interface FastifyInstance {
    ToDoRepository: IToDoRepository;
  }
}
