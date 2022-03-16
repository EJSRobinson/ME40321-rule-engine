import * as https from 'http';
import { resolve } from 'path';
let options = {
  hostname: '127.0.0.1',
  port: 5000,
  path: '/test',
  method: 'GET',
};

export function remoteSolvers(path) {
  options.path = path;
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.on('data', (responseData) => {
        resolve(JSON.parse(responseData));
      });
    });
    req.on('error', (error) => {
      console.error(error);
      reject();
    });
    req.end();
  });
}
