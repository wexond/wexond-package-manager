import path from 'path';

import { readFile, exists } from '../utils/files';
import Package from '../models/package'; // eslint-disable-line

export const readPackage = (dir: string) =>
  new Promise((resolve: (pkg: Package) => void, reject) => {
    const packagePath = path.resolve(dir, 'package.json');
    const namespace = path.basename(dir);

    if (exists(packagePath)) {
      readFile(packagePath, 'utf8').then((data) => {
        const pkg = JSON.parse(data);

        resolve({
          ...pkg,
          main: path.resolve(packagePath, pkg.main),
          path: dir,
          namespace,
        });
      });
    } else {
      reject(new Error(`Couldn't find package.json for plugin ${namespace}.`));
    }
  });
