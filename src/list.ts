import fs from 'fs';
import path from 'path';

import { WEXOND_DATA_PATH } from './constants/paths';

export default () => new Promise((resolve: (plugins: string[]) => void, reject) => {
  const plugins: string[] = [];

  fs.readdir(path.resolve(WEXOND_DATA_PATH, 'plugins'), (err, pluginDirNames) => {
    if (err) {
      reject(err);
    }

    for (const pluginDirName of pluginDirNames) {
      plugins.push(pluginDirName);
    }

    resolve(plugins);
  });
});
