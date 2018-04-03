import fs from 'fs';
import rimraf from 'rimraf';
import { ncp } from 'ncp';
import { promisify } from 'util';

export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);
export const unlink = promisify(fs.unlink);
export const open = promisify(fs.open);

export const exists = (path: string) =>
  new Promise((resolve) => {
    open(path, 'r')
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });

export const move = (path1: string, path2: string) =>
  new Promise((resolve, reject) => {
    ncp(path1, path2, (err) => {
      if (err) {
        reject(err);
      }
      rimraf(path1, () => {
        resolve();
      });
    });
  });
