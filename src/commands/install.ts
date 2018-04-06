import chalk from 'chalk';
import path from 'path';
import config from '../config';
import { info, success } from '../utils/console';
import { move } from '../utils/files';
import { cloneRepository, parseRepository } from '../utils/github';
import { npmInstall, updatePackage } from '../utils/packages';

export default async (name: string, logs = true) => {
  if (name.includes('/')) {
    // Probably the package is from a GitHub repo.

    info(chalk`Installing {underline.bold ${name}}...`, logs);

    const repo = parseRepository(name);
    try {
      const oldDir = path.resolve(config.path, `${repo.name}-${repo.branch}`);
      const dir = path.resolve(config.path, `${repo.name}`);

      info('Cloning repository from GitHub...', logs);

      await cloneRepository(repo, config.path);
      await move(oldDir, dir);
      await updatePackage(dir, {
        packageRepo: name,
      });

      info("Installing package's dependencies...", logs);
      await npmInstall(dir, logs);

      success(chalk`Successfully installed {underline.bold ${name}}!`, logs);
    } catch (e) {
      throw e;
    }
  } else {
    throw new Error('Invalid package name');
  }
};
