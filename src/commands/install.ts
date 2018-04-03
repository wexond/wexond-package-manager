import path from 'path';
import { updatePackage } from '../utils/packages';
import config from '../config';
import { cloneRepository, parseRepository } from '../utils/github';
import { move } from '../utils/files';

export default (name: string, options = {}) =>
  new Promise(async (resolve, reject) => {
    if (name.includes('/')) {
      // Probably the package is from a GitHub repo.

      const repo = parseRepository(name);
      try {
        const oldDir = path.resolve(config.path, `${repo.name}-${repo.branch}`);
        const dir = path.resolve(config.path, `${repo.name}`);
        await cloneRepository(repo, config.path, options);
        await updatePackage(oldDir, {
          packageRepo: name,
        });
        move(oldDir, dir);
        resolve();
      } catch (e) {
        reject(e);
      }
    } else {
      reject(new Error('Invalid package name'));
    }
  });
