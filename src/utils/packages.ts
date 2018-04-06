import path from 'path';

import { readFile, exists, writeFile } from '../utils/files';
import Package from '../models/package'; // eslint-disable-line

const npm = require('npm');

export async function readPackage(dir: string): Promise<Package> {
  const packagePath = path.resolve(dir, 'package.json');
  const namespace = path.basename(dir);

  if (await exists(packagePath)) {
    return JSON.parse(await readFile(packagePath, 'utf8'));
  }
  throw new Error(`Couldn't find package.json for plugin ${namespace}.`);
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

export async function getDependencies(dir: string): Promise<string[]> {
  const pkg = await readPackage(dir);
  const deps = [];

  for (const key in pkg.dependencies) {
    deps.push(`${key}@${pkg.dependencies[key]}`);
  }

  return deps;
}

export async function npmInstall(dir: string, logs = true) {
  return new Promise(async (resolve, reject) => {
    npm.load({ loglevel: 'silent' }, (err) => {
      if (err) return reject(err);

      npm.commands.install(dir, [], (er, data) => {
        if (err) reject(err);
        resolve(data);
      });

      npm.on('log', (message) => {
        if (logs) console.log(message);
      });
    });
  });
}
