import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { ServiceE2eGeneratorSchema } from './schema';

export async function serviceE2eGenerator(
  tree: Tree,
  options: ServiceE2eGeneratorSchema
) {
  const projectRoot = `apps/${options.name}-e2e`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default serviceE2eGenerator;
