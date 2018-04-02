import { cloneRepository, parseRepository } from '../utils/github';
import config from '../config';

export default (name: string, options = {}) => {
  if (name.includes('/')) {
    // Probably the package is from a GitHub repo.

    const repo = parseRepository(name);
    return cloneRepository(repo, config.path, options);
  }
  return new Promise((res, reject) => {
    res(null);
    reject(new Error('Invalid package name'));
  });
};
