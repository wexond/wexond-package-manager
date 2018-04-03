import fs from 'fs';
import { promisify } from 'util';

export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);
export const rename = promisify(fs.writeFile);
export const unlink = promisify(fs.unlink);
export const open = promisify(fs.open);

export const exists = (path: string) =>
  new Promise((resolve, reject) => {
    open(path, 'r')
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
