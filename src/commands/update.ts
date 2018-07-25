import chalk from 'chalk';
import path from 'path';
import install from './install';
import config from '../config';
import { info, success, error } from '../utils/console';
import { remove } from '../utils/files';
import { parseRepository } from '../utils/github';
import { readPackage } from '../utils/packages';
import request from '../utils/request';

export default async (namespace: string, logs = true) => {
  const { branch, name, owner } = parseRepository(namespace);
  if (name) {
    const pluginPath = path.resolve(config.path, name);
    const { version } = await readPackage(pluginPath);

    try {
      info(chalk`Checking for updates for package {underline.bold ${namespace}}`, logs);
      const pkgInfo = await request(
        `https://api.github.com/repos/${owner}/${name}/contents/package.json?branch=${branch}`,
      );
      const newPkg = await request(pkgInfo.download_url);

      if (version !== newPkg.version) {
        info(`Current package version: ${version}`, logs);
        info(`New package version: ${newPkg.version}`, logs);

        await remove(pluginPath);
        await install(namespace, logs);

        success(chalk`Successfully updated package {underline.bold ${namespace}}!`, logs);
      } else {
        success(chalk`Package {underline.bold ${namespace}} is already up to date!`, logs);
      }
    } catch (e) {
      throw e;
    }
  }
  error('Invalid package name', logs);
};
