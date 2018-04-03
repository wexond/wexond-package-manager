import path from 'path';

import { readFile, exists, writeFile } from '../utils/files';
import Package from '../models/package'; // eslint-disable-line

export function readPackage(dir: string) {
  return new Promise((resolve: (pkg: Package) => void, reject) => {
    const packagePath = path.resolve(dir, 'package.json');
    const namespace = path.basename(dir);

    exists(packagePath)
      .then(() => {
        readFile(packagePath, 'utf8').then((data) => {
          const pkg = JSON.parse(data);

          resolve({
            ...pkg,
            namespace,
          });
        });
      })
      .catch(() => {
        reject(new Error(`Couldn't find package.json for plugin ${namespace}.`));
      });
  });
}

export async function updatePackage(dir: string, json: object) {
  const pkg = await readPackage(dir);
  return writeFile(
    path.resolve(dir, 'package.json'),
    JSON.stringify({
      ...pkg,
      ...json,
    }),
  );
}
