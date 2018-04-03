import request from 'request';
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

    request(
      `https://api.github.com/repos/${packageRepo}/contents/package.json?branch=${branch}`,
      {
        headers: {
          'User-Agent': 'wexond-package-manager',
        },
      },
      (err1, res1, pkgInfo) => {
        if (err1) {
          reject(err1);
        }

        pkgInfo = JSON.parse(pkgInfo);

        request(
          pkgInfo.download_url,
          {
            headers: {
              'User-Agent': 'wexond-package-manager',
            },
          },
          async (err, res, newPkg) => {
            newPkg = JSON.parse(newPkg);

            if (version !== newPkg.version) {
              try {
                await remove(pluginPath);
                await install(packageRepo);
                resolve();
              } catch (e) {
                reject(e);
              }
            }
          },
        );
      },
    );
  });
