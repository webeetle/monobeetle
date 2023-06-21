import * as path from 'path';
import { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'infrastructure/plugins'),
    options: opts
  })

  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'infrastructure/repositories'),
    options: opts
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'application/routes'),
    options: opts
  })

  // This loads all plugins defined in jrpc
  // define your jrpc in one of these
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'application/jrpc'),
    options: opts
  })
}
