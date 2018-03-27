import fs from 'fs';
import path from 'path';

import { readPackage } from '../utils/packages';
import Package from '../models/package'; // eslint-disable-line
import { pluginsPath } from '../config';

export default () =>
  new Promise((resolve: (plugins: Package[]) => void, reject) => {
    const packages = [];

    fs.readdir(pluginsPath, (err, dirs) => {
      if (err) {
        reject(err);
      }

      for (const dir of dirs) {
        const pkgDir = path.resolve(pluginsPath, dir);
        packages.push(readPackage(pkgDir));
      }

      resolve(packages);
    });
  });
