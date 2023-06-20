import {Knex} from "knex";

declare module 'fastify' {
  export interface FastifyInstance {
    mysql: Knex;
  }
}
