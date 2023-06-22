import {
  addDependenciesToPackageJson,
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import {ServiceE2eGeneratorSchema} from './schema';

export async function serviceE2eGenerator(
  tree: Tree,
  options: ServiceE2eGeneratorSchema
) {
  const projectRoot = `apps/${options.name}-e2e`;
  addDependenciesToPackageJson(
    tree,
    {
      "@fastify/autoload": "^5.7.1",
      "@fastify/cors": "^8.2.1",
      "@fastify/sensible": "^5.2.0",
      "@fastify/swagger": "^8.3.1",
      "@fastify/swagger-ui": "^1.7.0",
      "@habeetat/jrpc-server": "^0.0.8",
      "@nx/devkit": "16.3.2",
      "@nx/plugin": "^16.3.2",
      "@swc/helpers": "~0.5.0",
      "better-sqlite3": "^8.2.0",
      "close-with-grace": "^1.1.0",
      "dotenv": "^16.0.3",
      "fastify": "^4.15.0",
      "fastify-plugin": "^4.5.0",
      "knex": "^2.4.2",
      "tslib": "^2.3.0",
      "uuid": "^9.0.0",
      "zod": "^3.21.4",
      "zod-to-json-schema": "^3.20.4"
    },
    {
      "@nx/esbuild": "16.3.2",
      "@nx/eslint-plugin": "16.3.2",
      "@nx/jest": "16.3.2",
      "@nx/js": "16.3.2",
      "@nx/linter": "16.3.2",
      "@nx/node": "16.3.2",
      "@swc-node/register": "~1.4.2",
      "@swc/cli": "~0.1.62",
      "@swc/core": "~1.3.51",
      "@types/jest": "^29.4.0",
      "@types/node": "~18.7.1",
      "@types/uuid": "^9.0.2",
      "@typescript-eslint/eslint-plugin": "^5.58.0",
      "@typescript-eslint/parser": "^5.58.0",
      "esbuild": "^0.17.17",
      "eslint": "~8.15.0",
      "eslint-config-prettier": "8.1.0",
      "jest": "^29.4.1",
      "jest-environment-jsdom": "^29.4.1",
      "jest-environment-node": "^29.4.1",
      "jsonc-eslint-parser": "^2.1.0",
      "prettier": "^2.6.2",
      "ts-jest": "^29.1.0",
      "ts-node": "10.9.1",
      "typescript": "~5.0.2"
    }
  )
  addProjectConfiguration(tree, `${options.name}-e2e`, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: `${projectRoot}/src`,
    targets: {
      "e2e": {
        "executor": "@nx/jest:jest",
        "outputs": ["{workspaceRoot}/coverage/{e2eProjectRoot}"],
        "options": {
          "jestConfig": "apps/"+options.name+"-e2e/jest.config.ts",
          "passWithNoTests": true
        }
      },
      "lint": {
        "executor": "@nx/linter:eslint",
        "outputs": ["{options.outputFile}"],
        "options": {
          "lintFilePatterns": ["apps/"+options.name+"-e2e/**/*.{js,ts}"]
        }
      }
    },
    tags: ['type:service-e2e'],
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default serviceE2eGenerator;
