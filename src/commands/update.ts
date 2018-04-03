import got from 'got';
import path from 'path';
import { parseRepository } from 'utils/github';
import config from '../config';
import { readPackage } from '../utils/packages';
import { unlink } from '../utils/files';
import install from './install';

export default (namespace: string) =>
  new Promise(async (resolve, reject) => {
    const pluginPath = path.resolve(config.path, namespace);
    const { packageRepo, version } = await readPackage(pluginPath);
    const { branch } = parseRepository(packageRepo);
    const newPkgURL = `https://api.github.com/repos/${packageRepo}/contents/package.json?branch=${branch}`;

    const { body } = await got(newPkgURL);
    const newPkg = JSON.parse(body);

    if (version !== newPkg.version) {
      try {
        await unlink(pluginPath);
        await install(packageRepo);
        resolve();
      } catch (e) {
        reject(e);
      }
    }
  });
