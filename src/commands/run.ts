import EasyVM from 'easy-vm';
import { resolve } from 'path';

import { readPackage } from '../utils/packages';
import { readFile } from '../utils/files';
import config from '../config';
import { parseRepository } from '../utils/github';

export default async (namespace: string, sandbox = {}) => {
  const { name } = parseRepository(namespace);
  const pluginPath = resolve(config.path, name);
  const pkg = await readPackage(pluginPath);
  const mainCode = await readFile(resolve(pluginPath, pkg.main), 'utf8');

  const vm = new EasyVM({
    require: {
      builtin: ['*'],
      mock: {
        fs: {},
      },
    },
    sandbox,
    console: true,
  });

  return vm.run(mainCode, pkg.main);
};
