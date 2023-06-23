import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
  addDependenciesToPackageJson
} from '@nx/devkit';
import * as path from 'path';
import { ServiceGeneratorSchema } from './schema';

export async function uiGenerator(
  tree: Tree,
  options: ServiceGeneratorSchema
) {
  const projectRoot = `apps/${options.name}`;
  addDependenciesToPackageJson(
    tree,
    {
      "@date-io/moment": "^2.16.1",
      "@swc/helpers": "~0.5.0",
      "@tanstack/react-query": "^4.29.15",
      "axios": "^1.4.0",
      "moment": "^2.29.4",
      "react": "18.2.0",
      "react-dom": "18.2.0",
      "react-error-boundary": "^4.0.10",
      "react-hook-form": "^7.45.0",
      "react-router-dom": "^6.13.0",
      "react-table": "^7.8.0",
      "react-toastify": "^9.1.3",
      "tslib": "^2.3.0",
      "yup": "^1.2.0"
    },
    {
      "@babel/preset-react": "^7.14.5",
      "@cypress/webpack-dev-server": "^2.0.0",
      "@nx/cypress": "16.3.2",
      "@nx/eslint-plugin": "16.3.2",
      "@nx/jest": "16.3.2",
      "@nx/js": "16.3.2",
      "@nx/linter": "16.3.2",
      "@nx/react": "16.3.2",
      "@nx/webpack": "16.3.2",
      "@nx/workspace": "16.3.2",
      "@pmmmwh/react-refresh-webpack-plugin": "^0.5.7",
      "@svgr/webpack": "^8.0.1",
      "@swc/cli": "~0.1.62",
      "@swc/core": "~1.3.51",
      "@testing-library/react": "14.0.0",
      "@types/jest": "^29.4.0",
      "@types/node": "18.14.2",
      "@types/react": "18.0.28",
      "@types/react-dom": "18.0.11",
      "@typescript-eslint/eslint-plugin": "^5.58.0",
      "@typescript-eslint/parser": "^5.58.0",
      "babel-jest": "^29.4.1",
      "cypress": "^12.11.0",
      "eslint": "~8.15.0",
      "eslint-config-prettier": "8.1.0",
      "eslint-plugin-cypress": "^2.10.3",
      "eslint-plugin-import": "2.27.5",
      "eslint-plugin-jsx-a11y": "6.7.1",
      "eslint-plugin-react": "7.32.2",
      "eslint-plugin-react-hooks": "4.6.0",
      "html-webpack-plugin": "^5.5.0",
      "jest": "^29.4.1",
      "jest-environment-jsdom": "^29.4.1",
      "nx": "16.3.2",
      "nx-cloud": "latest",
      "prettier": "^2.6.2",
      "react-refresh": "^0.10.0",
      "ts-jest": "^29.1.0",
      "ts-node": "10.9.1",
      "typescript": "~5.0.2",
      "url-loader": "^4.1.1",
      "webpack-merge": "^5.9.0"
    }
  )
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: `${projectRoot}/src`,
    tags: ['type:ui'],
    targets: {
      "build": {
        "executor": "@nx/webpack:webpack",
        "outputs": ["{options.outputPath}"],
        "defaultConfiguration": "production",
        "options": {
          "compiler": "babel",
          "outputPath": "dist/apps/" + options.name,
          "index": "apps/" + options.name + "/src/index.html",
          "baseHref": "/",
          "main": "apps/"+ options.name +"/src/main.tsx",
          "tsConfig": "apps/"+ options.name +"/tsconfig.app.json",
          "assets": [
            "apps/"+ options.name +"/src/favicon.ico",
            "apps/"+ options.name +"/src/assets"
          ],
          "styles": ["apps/"+ options.name +"/src/styles.css"],
          "scripts": [],
          "isolatedConfig": true,
          "webpackConfig": "apps/"+ options.name +"/webpack.config.js"
        },
        "configurations": {
          "development": {
            "extractLicenses": false,
            "optimization": false,
            "sourceMap": true,
            "vendorChunk": true
          },
          "production": {
            "fileReplacements": [
              {
                "replace": "apps/"+ options.name +"/src/environments/environment.ts",
                "with": "apps/"+ options.name +"/src/environments/environment.prod.ts"
              }
            ],
            "optimization": true,
            "outputHashing": "all",
            "sourceMap": false,
            "namedChunks": false,
            "extractLicenses": true,
            "vendorChunk": false
          }
        }
      },
      "serve": {
        "executor": "@nx/webpack:dev-server",
        "defaultConfiguration": "development",
        "options": {
          "buildTarget": options.name +":build",
          "hmr": true
        },
        "configurations": {
          "development": {
            "buildTarget": options.name +":build:development"
          },
          "production": {
            "buildTarget": options.name +":build:production",
            "hmr": false
          }
        }
      },
      "lint": {
        "executor": "@nx/linter:eslint",
        "outputs": ["{options.outputFile}"],
        "options": {
          "lintFilePatterns": ["apps/"+ options.name +"/**/*.{ts,tsx,js,jsx}"]
        }
      },
      "serve-static": {
        "executor": "@nx/web:file-server",
        "options": {
          "buildTarget": options.name +":build"
        }
      },
      "component-test": {
        "executor": "@nx/cypress:cypress",
        "options": {
          "cypressConfig": "apps/"+ options.name +"/cypress.config.ts",
          "testingType": "component",
          "devServerTarget": options.name +":build",
          "skipServe": true
        }
      }
    },
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default uiGenerator;
