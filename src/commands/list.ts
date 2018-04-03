import fs from 'fs';
import path from 'path';

import { readPackage } from '../utils/packages';
import Package from '../models/package'; // eslint-disable-line
import config from '../config';
import { exists } from '../utils/files';

export default () =>
  new Promise((resolve: (plugins: Package[]) => void, reject) => {
    const packages = [];

    fs.readdir(config.path, async (err, dirs) => {
      if (err) {
        reject(err);
      }

      for (const dir of dirs) {
        const pkgDir = path.resolve(config.path, dir);
        if (await exists(path.resolve(pkgDir, 'package.json'))) {
          const pkg = await readPackage(pkgDir);
          packages.push(pkg);
        }
      }

      resolve(packages);
    });
  });
