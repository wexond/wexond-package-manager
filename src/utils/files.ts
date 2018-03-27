import fs from 'fs';
import util from 'util';

export const readFile = util.promisify(fs.readFile);
export const stat = util.promisify(fs.stat);

export const exists = (path: string) => {
  stat(path)
    .then(() => true)
    .catch(() => false);
};
