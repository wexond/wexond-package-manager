import https from 'https';
import { WriteStream } from 'fs';

export default (url: string, file: WriteStream = null): Promise<any> =>
  new Promise((resolve, reject) => {
    https
      .get(url, res => {
        let data = '';

        if (file) {
          res.pipe(file);
        }

        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', () => {
          resolve(JSON.parse(data));
        });
      })
      .on('error', err => {
        reject(err);
      });
  });
