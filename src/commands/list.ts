import fs from 'fs';
import path from 'path';

import { readPackage } from '../utils/packages';
import Package from '../models/package'; // eslint-disable-line

export default (packagesDir: string) =>
  new Promise((resolve: (plugins: Package[]) => void, reject) => {
    const packages = [];

    fs.readdir(packagesDir, (err, dirs) => {
      if (err) {
        reject(err);
      }

      for (const dir of dirs) {
        const pkgDir = path.resolve(packagesDir, dir);
        packages.push(readPackage(pkgDir));
      }

      resolve(packages);
    });
  });
