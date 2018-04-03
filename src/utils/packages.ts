import path from 'path';

import { readFile, exists, writeFile } from '../utils/files';
import Package from '../models/package'; // eslint-disable-line

export const readPackage = (dir: string) =>
  new Promise((resolve: (pkg: Package) => void, reject) => {
    const packagePath = path.resolve(dir, 'package.json');
    const namespace = path.basename(dir);

    exists(packagePath)
      .then(() => {
        readFile(packagePath, 'utf8').then((data) => {
          const pkg = JSON.parse(data);

          resolve({
            ...pkg,
            main: path.resolve(dir, pkg.main),
            path: dir,
            namespace,
          });
        });
      })
      .catch(() => {
        reject(new Error(`Couldn't find package.json for plugin ${namespace}.`));
      });
  });

export function updatePackage(dir: string, json: Object) {
  return readPackage(dir).then(data =>
    writeFile(
      data.path,
      JSON.stringify({
        ...data,
        ...json,
      }),
    ));
}
