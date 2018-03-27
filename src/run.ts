import { NodeVM } from 'vm2';
import fs from 'fs';
import path from 'path';

import { WEXOND_DATA_PATH } from './constants/paths';

interface IPackage {
  main: string;
  author: any | string;
  name: string;
  version: string;
  description: string;
}

export default (packageName: string, sandbox = {}) => {
  const pluginPath = path.resolve(WEXOND_DATA_PATH, 'plugins', packageName);
  const pluginPackagePath = path.resolve(pluginPath);

  const pluginPackage = JSON.parse(fs.readFileSync(pluginPackagePath, 'utf8')) as IPackage;

  const pluginMainPath = path.resolve(pluginPath, pluginPackage.main);
  const pluginMainCode = fs.readFileSync(pluginMainPath, 'utf8');

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

  return vm.run(pluginMainCode, pluginMainPath);
};
