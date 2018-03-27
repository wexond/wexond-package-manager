import { NodeVM } from 'vm2';
import { resolve } from 'path';

import { readPackage } from '../utils/packages';
import { readFile } from '../utils/files';
import { pluginsPath } from '../config';

export default async (namespace: string, sandbox = {}) => {
  const pluginPath = resolve(pluginsPath, namespace);
  const pkg = await readPackage(pluginPath);
  const mainCode = await readFile(pkg.main, 'utf8');

  const vm = new NodeVM({
    console: 'inherit',
    sandbox,
    require: {
      external: true,
      builtin: ['*'],
      root: './',
      mock: {
        fs: {},
      },
    },
  });

  return vm.run(mainCode, pkg.main);
};
