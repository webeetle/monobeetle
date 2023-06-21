import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { serviceE2eGenerator } from './generator';
import { ServiceE2eGeneratorSchema } from './schema';

describe('service-e2e generator', () => {
  let tree: Tree;
  const options: ServiceE2eGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await serviceE2eGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
