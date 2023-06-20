// This file contains code that we reuse between our tests.
import {FastifyInstance, fastify} from "fastify";
import AutoLoad from '@fastify/autoload';

import {seed} from "../seeds/test_seed";
import path from "path";
import {Knex} from "knex";

// Fill in this config with all the configurations
// needed for testing the application
export function config(): {'mysql.clients':Knex.Config} {
  return {
    "mysql.clients": {
      client: 'better-sqlite3',
      connection: {
        filename: path.join(__dirname, '../assets/test.db.sqlite'),
      },
      migrations: {
        directory: path.join(__dirname, '../migrations'),
      },
      useNullAsDefault: true
    }
  }
}

// Automatically build and tear down our instance
async function build() {
  const app = fastify()

  void app.register(AutoLoad, {
    dir: path.join(__dirname, '../infrastructure/plugins'),
    options: config(),
    // ignorePattern: !process.env.MONGO_STRING_URL ? /.*mongo.*/ : /null/
  })
  void app.register(AutoLoad, {
    dir: path.join(__dirname, '../infrastructure/repositories'),
    options: config()
  })

  await app.ready()
  await app.mysql.migrate.latest()

  return app
}

async function prepareDB(fastify: FastifyInstance) {
  await seed(fastify.mysql)
}

async function emptyDB(fastify: FastifyInstance) {
  await fastify.mysql('todo').del()
}


export {
  build,
  prepareDB,
  emptyDB
}
