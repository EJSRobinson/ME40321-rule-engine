import * as https from 'http';

export function remoteSolvers(path, vars) {
  let body = JSON.stringify(vars);
  let options = {
    hostname: '127.0.0.1',
    port: 5000,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': body.length,
    },
  };
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.on('data', (responseData) => {
        resolve(JSON.parse(responseData));
      });
    });
    req.write(body);
    req.on('error', (error) => {
      console.error(error);
      reject();
    });
    req.end();
  });
}
