import { resolve } from 'path';
import { cloneRepository, parseRepository } from '../utils/github';
import config from '../config';

export default (name: string) => {
  if (name.includes('/')) {
    // Probably the package is from a GitHub repo.

    const repo = parseRepository(name);
    const dest = resolve(config.path, repo.name);
    return cloneRepository(repo, dest);
  }
  return new Promise((res, reject) => {
    res(null);
    reject(new Error('Invalid package name'));
  });
};
