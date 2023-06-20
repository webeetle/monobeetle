import type { Knex } from "knex";
import * as path from 'path';

// Update with your config settings.
const KnexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: path.join(__dirname, "assets/db.sqlite"),
    },
    useNullAsDefault: true
  },
  staging: {
    client: 'better-sqlite3',
    connection: {
      filename: path.join(__dirname, "assets/db.sqlite"),
    },
    useNullAsDefault: true
  },
  production: {
    client: 'better-sqlite3',
    connection: {
      filename: path.join(__dirname, "assets/db.sqlite"),
    },
    useNullAsDefault: true
  },
};

export default KnexConfig;
