import request from 'request';

export default (url: string): Promise<any> =>
  new Promise((resolve, reject) => {
    request(
      url,
      {
        headers: {
          'User-Agent': 'wexond-package-manager',
        },
      },
      (err, res, data) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(data));
      },
    );
  });
