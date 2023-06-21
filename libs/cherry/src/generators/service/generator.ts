import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { ServiceGeneratorSchema } from './schema';

export async function serviceGenerator(
  tree: Tree,
  options: ServiceGeneratorSchema
) {
  const projectRoot = `apps/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: `${projectRoot}/src`,
    tags: ['type:service'],
    targets: {
      "build": {
        "executor": "@nx/esbuild:esbuild",
        "outputs": ["{options.outputPath}"],
        "defaultConfiguration": "production",
        "options": {
          "platform": "node",
          "outputPath": "dist",
          "format": ["cjs"],
          "bundle": false,
          "main": "apps/"+options.name+"/src/main.ts",
          "tsConfig": "apps/"+options.name+"/tsconfig.app.json",
          "assets": [{ "input": "apps/"+options.name+"/src/assets", "glob": "*.*", "output": "/apps/"+options.name+"/src/assets" }],
          "generatePackageJson": true,
          "esbuildOptions": {
            "sourcemap": true,
            "outExtension": {
              ".js": ".js"
            }
          }
        },
        "configurations": {
          "development": {},
          "production": {
            "generateLockfile": true,
            "esbuildOptions": {
              "sourcemap": false,
              "outExtension": {
                ".js": ".js"
              }
            }
          }
        }
      },
      "serve": {
        "executor": "@nx/js:node",
        "defaultConfiguration": "development",
        "options": {
          "buildTarget": ""+options.name+":build"
        },
        "configurations": {
          "development": {
            "buildTarget": ""+options.name+":build:development"
          },
          "production": {
            "buildTarget": ""+options.name+":build:production"
          }
        }
      },
      "db:init": {
        "dependsOn": [
          {
            "projects": "self",
            "target": "db:migrate:reset"
          },
          {
            "projects": "self",
            "target": "db:migrate:latest"
          }
        ],
        "command": "echo 'initialized db'"
      },
      "db:migrate:reset": {
        "command": "knex migrate:rollback --knexfile=apps/"+options.name+"/src/knexfile.ts --all"
      },
      "db:migrate:latest": {
        "command": "knex migrate:latest --knexfile=apps/"+options.name+"/src/knexfile.ts"
      },
      "lint": {
        "executor": "@nx/linter:eslint",
        "outputs": ["{options.outputFile}"],
        "options": {
          "lintFilePatterns": ["apps/"+options.name+"/**/*.ts"]
        }
      },
      "test": {
        "executor": "@nx/jest:jest",
        "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
        "options": {
          "jestConfig": "apps/"+options.name+"/jest.config.ts",
          "runInBand": true,
          "passWithNoTests": true
        },
        "configurations": {
          "ci": {
            "ci": true,
            "codeCoverage": true
          }
        }
      },
      "docker-build": {
        "dependsOn": ["build"],
        "command": "docker build -f apps/"+options.name+"/Dockerfile . -t "+options.name+""
      }
    },
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default serviceGenerator;
