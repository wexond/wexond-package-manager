import got from 'got';
import path from 'path';
import install from './install';
import config from '../config';
import { remove } from '../utils/files';
import { parseRepository } from '../utils/github';
import { readPackage } from '../utils/packages';

export default (namespace: string) =>
  new Promise(async (resolve, reject) => {
    const pluginPath = path.resolve(config.path, namespace);
    const { packageRepo, version } = await readPackage(pluginPath);
    const { branch } = parseRepository(packageRepo);

    const pkgInfo = JSON.parse((await got(
      `https://api.github.com/repos/${packageRepo}/contents/package.json?branch=${branch}`,
      { useElectronNet: false },
    )).body);
    const newPkg = JSON.parse((await got(pkgInfo.download_url)).body);

    if (version !== newPkg.version) {
      try {
        await remove(pluginPath);
        await install(packageRepo);
        resolve();
      } catch (e) {
        reject(e);
      }
    }
  });
