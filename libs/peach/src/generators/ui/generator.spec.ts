import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';
import {ServiceGeneratorSchema} from "./schema";
import uiGenerator from "./generator";



describe('ui generator', () => {
  let tree: Tree;
  const options: ServiceGeneratorSchema = { name: 'test', host: 'localhost', port: '3001' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await uiGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
