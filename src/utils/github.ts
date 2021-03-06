import decompress from 'decompress';
import { createWriteStream } from 'fs';
import path from 'path';

import { remove } from './files';
import request from './request';

export interface GitHubRepository {
  owner: string;
  branch: string;
  name: string;
}

export const parseRepository = (repo: string): GitHubRepository => {
  const owner: string = repo.split('/')[0];

  let branch: string = 'master';
  let name: string = repo.split('/')[1];

  if (name && name.includes('#')) {
    branch = name.split('#')[1];
    name = name.split('#')[0];
  }

  return { owner, name, branch };
};

export const repoTypeCheck = (repo: string | GitHubRepository) => {
  if (typeof repo === 'string') {
    return parseRepository(repo);
  }
  return repo;
};

export const getArchiveLink = (repo: string | GitHubRepository) => {
  const { owner, name, branch } = repoTypeCheck(repo);
  return `https://github.com/${owner}/${name}/archive/${branch}.zip`;
};

export const cloneRepository = (repo: string | GitHubRepository, dest: string) =>
  new Promise((resolve, reject) => {
    const { name, owner, branch } = repoTypeCheck(repo);

    const zipPath = path.resolve(dest, `${owner}:${name}#${branch}.zip`);
    const file = createWriteStream(zipPath);

    request(getArchiveLink(repo), file)
      .then(() => {
        decompress(zipPath, dest)
          .then(() => {
            remove(zipPath).then(() => {
              resolve();
            });
          })
          .catch(e => {
            reject(e);
          });
      })
      .catch(e => {
        reject(e);
      });
  });
