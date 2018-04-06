import chalk from 'chalk';
import path from 'path';
import config from '../config';
import { info, success } from '../utils/console';
import { move } from '../utils/files';
import { cloneRepository, parseRepository } from '../utils/github';
import { npmInstall, updatePackage } from '../utils/packages';

export default async (namespace: string, logs = true) => {
  if (namespace.includes('/')) {
    // Probably the package is from a GitHub repo.

    info(chalk`Installing {underline.bold ${namespace}}...`, logs);

    const { name, branch } = parseRepository(namespace);
    try {
      const oldDir = path.resolve(config.path, `${name}-${branch}`);
      const dir = path.resolve(config.path, `${name}`);

      info('Cloning repository from GitHub...', logs);

      await cloneRepository(namespace, config.path);
      await move(oldDir, dir);
      await updatePackage(dir, { namespace });

      info("Installing package's dependencies...", logs);
      await npmInstall(dir, logs);

      success(chalk`Successfully installed {underline.bold ${namespace}}!`, logs);
    } catch (e) {
      throw e;
    }
  } else {
    throw new Error('Invalid package namespace');
  }
};
