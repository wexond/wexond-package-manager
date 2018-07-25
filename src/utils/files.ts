import * as fs from 'fs';
import rimraf from 'rimraf';
import { ncp } from 'ncp';
import { promisify } from 'util';

export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);
export const open = promisify(fs.open);
export const readdir = promisify(fs.readdir);

export async function exists(path: string) {
  try {
    await open(path, 'r');
    return true;
  } catch (e) {
    return false;
  }
}

export const remove = (path: string) =>
  new Promise(resolve => {
    rimraf(path, () => {
      resolve();
    });
  });

export const move = (path1: string, path2: string) =>
  new Promise((resolve, reject) => {
    ncp(path1, path2, async err => {
      if (err) {
        reject(err);
      }
      await remove(path1);
      resolve();
    });
  });
