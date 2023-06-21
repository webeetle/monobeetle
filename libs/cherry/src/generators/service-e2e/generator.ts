import {
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
