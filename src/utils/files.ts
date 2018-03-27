import fs from 'fs';
import util from 'util';

export const readFile = util.promisify(fs.readFile);
export const open = util.promisify(fs.open);

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
