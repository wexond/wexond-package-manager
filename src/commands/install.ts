import { resolve } from 'path';
import { updatePackage } from 'utils/packages';
import config from '../config';
import { cloneRepository, parseRepository } from '../utils/github';
import { rename } from '../utils/files';

export default (name: string, options = {}) => {
  if (name.includes('/')) {
    // Probably the package is from a GitHub repo.

    const repo = parseRepository(name);
    return cloneRepository(repo, config.path, options).then(() => {
      const dir = resolve(config.path, `${repo.name}`);

      rename(resolve(config.path, `${repo.name}-${repo.branch}`), dir).then(() => {
        updatePackage(dir, {
          packageRepo: name,
        });
      });
    });
  }
  return new Promise((res, reject) => {
    res(null);
    reject(new Error('Invalid package name'));
  });
};
