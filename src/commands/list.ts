import path from 'path';

import { readPackage } from '../utils/packages';
import Package from '../models/package'; // eslint-disable-line
import config from '../config';
import { exists, readdir } from '../utils/files';

export default async (): Promise<Package[]> => {
  const packages = [] as Package[];

  try {
    const dirs = await readdir(config.path);
    for (const dir of dirs) {
      const pkgDir = path.resolve(config.path, dir);
      if (await exists(path.resolve(pkgDir, 'package.json'))) {
        const pkg = await readPackage(pkgDir);
        packages.push(pkg);
      }
    }
    return packages;
  } catch (e) {
    throw e;
  }
};
