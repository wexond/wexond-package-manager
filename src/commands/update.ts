import chalk from 'chalk';
import path from 'path';
import install from './install';
import config from '../config';
import { info, success } from '../utils/console';
import { remove } from '../utils/files';
import { parseRepository } from '../utils/github';
import { readPackage } from '../utils/packages';
import request from '../utils/request';

export default async (namespace: string, logs = true) => {
  const pluginPath = path.resolve(config.path, namespace);
  const { packageRepo, version } = await readPackage(pluginPath);
  const { branch } = parseRepository(packageRepo);

  try {
    info(`Checking for updates for package {underline.bold ${namespace}}`, logs);
    const pkgInfo = await request(`https://api.github.com/repos/${packageRepo}/contents/package.json?branch=${branch}`);
    const newPkg = await request(pkgInfo.download_url);

    if (version !== newPkg.version) {
      info(`Current package version: ${version}`, logs);
      info(`New package version: ${newPkg.version}`, logs);

      await remove(pluginPath);
      await install(packageRepo, logs);

      success(chalk`Successfully updated package {underline.bold ${namespace}}!`, logs);
    } else {
      success(chalk`Package {underline.bold ${namespace}} is already up to date!`, logs);
    }
  } catch (e) {
    throw e;
  }
};
