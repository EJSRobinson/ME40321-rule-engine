import * as https from 'http';
import { remoteSolvers } from './api-client.js';
import { materials } from 'me40321-database/materials-core.js';

function exportClient(path, vars) {
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
        resolve(responseData);
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

export const plots = {
  Fn_V: async (mainMap) => {
    let inputs = {
      V: mainMap.get('V').value.max,
      Aref: mainMap.get('Aref').value.max,
      Cn: mainMap.get('Cn').value.max,
      RowA: mainMap.get('RowA').value.max,
      Alt: mainMap.get('Alt').value.max,
    };
    const result = await exportClient('/Fn_V', inputs);
    return result;
  },
  Fn_M: async (mainMap) => {
    let inputs = {
      M: mainMap.get('M').value.max,
      Aref: mainMap.get('Aref').value.max,
      Cn: mainMap.get('Cn').value.max,
      RowA: mainMap.get('RowA').value.max,
      Ta: mainMap.get('Ta').value.max,
      Alt: mainMap.get('Alt').value.max,
    };
    const result = await exportClient('/Fn_M', inputs);
    return result;
  },
  Fn_AoA: async (mainMap) => {
    let inputs = {
      V: mainMap.get('V').value.max,
      Aref: mainMap.get('Aref').value.max,
      Cna: mainMap.get('Cna').value.max,
      AoA: mainMap.get('AoA').value.max,
      RowA: mainMap.get('RowA').value.max,
      Alt: mainMap.get('Alt').value.max,
    };
    const result = await exportClient('/Fn_AoA', inputs);
    return result;
  },
  Fn_S: async (mainMap) => {
    let inputs = {
      cr: mainMap.get('cr').value.max,
      Fn: mainMap.get('Fn').value.max,
      Afin: mainMap.get('Afin').value.max,
      TEsw: mainMap.get('TEsw').value.max,
      LEsw: mainMap.get('LEsw').value.max,
      S: mainMap.get('S').value.max,
    };
    const result = await exportClient('/Fn_S', inputs);
    return result;
  },
  BM_S: async (mainMap) => {
    let inputs = {
      cr: mainMap.get('cr').value.max,
      Fn: mainMap.get('Fn').value.max,
      Afin: mainMap.get('Afin').value.max,
      TEsw: mainMap.get('TEsw').value.max,
      LEsw: mainMap.get('LEsw').value.max,
      S: mainMap.get('S').value.max,
    };
    const result = await exportClient('/BM_S', inputs);
    return result;
  },
  Ang_S: async (mainMap) => {
    let inputs = {
      cr: mainMap.get('cr').value.max,
      Fn: mainMap.get('Fn').value.max,
      Afin: mainMap.get('Afin').value.max,
      TEsw: mainMap.get('TEsw').value.max,
      LEsw: mainMap.get('LEsw').value.max,
      S: mainMap.get('S').value.max,
      Mat: materials[mainMap.get('Mat').value.val],
      t: mainMap.get('t').value.max,
    };
    const result = await exportClient('/Ang_S', inputs);
    return result;
  },
  Defl_S: async (mainMap) => {
    let inputs = {
      cr: mainMap.get('cr').value.max,
      Fn: mainMap.get('Fn').value.max,
      Afin: mainMap.get('Afin').value.max,
      TEsw: mainMap.get('TEsw').value.max,
      LEsw: mainMap.get('LEsw').value.max,
      S: mainMap.get('S').value.max,
      Mat: materials[mainMap.get('Mat').value.val],
      t: mainMap.get('t').value.max,
    };
    const result = await exportClient('/Defl_S', inputs);
    return result;
  },
  Stress_S: async (mainMap) => {
    let inputs = {
      cr: mainMap.get('cr').value.max,
      Fn: mainMap.get('Fn').value.max,
      Afin: mainMap.get('Afin').value.max,
      TEsw: mainMap.get('TEsw').value.max,
      LEsw: mainMap.get('LEsw').value.max,
      S: mainMap.get('S').value.max,
      t: mainMap.get('t').value.max,
    };
    const result = await exportClient('/Stress_S', inputs);
    return result;
  },
  Fn_V_data: async (mainMap) => {
    let inputs = {
      V: mainMap.get('V').value.max,
      Aref: mainMap.get('Aref').value.max,
      Cn: mainMap.get('Cn').value.max,
      RowA: mainMap.get('RowA').value.max,
      Alt: mainMap.get('Alt').value.max,
    };
    const result = await remoteSolvers('/Fn_V_data', inputs);
    return result;
  },
  Fn_M_data: async (mainMap) => {
    let inputs = {
      M: mainMap.get('M').value.max,
      Aref: mainMap.get('Aref').value.max,
      Cn: mainMap.get('Cn').value.max,
      RowA: mainMap.get('RowA').value.max,
      Ta: mainMap.get('Ta').value.max,
      Alt: mainMap.get('Alt').value.max,
    };
    const result = await remoteSolvers('/Fn_M_data', inputs);
    return result;
  },
  Fn_AoA_data: async (mainMap) => {
    let inputs = {
      V: mainMap.get('V').value.max,
      Aref: mainMap.get('Aref').value.max,
      Cna: mainMap.get('Cna').value.max,
      AoA: mainMap.get('AoA').value.max,
      RowA: mainMap.get('RowA').value.max,
      Alt: mainMap.get('Alt').value.max,
    };
    const result = await remoteSolvers('/Fn_AoA_data', inputs);
    return result;
  },
  Fn_S_data: async (mainMap) => {
    let inputs = {
      cr: mainMap.get('cr').value.max,
      Fn: mainMap.get('Fn').value.max,
      Afin: mainMap.get('Afin').value.max,
      TEsw: mainMap.get('TEsw').value.max,
      LEsw: mainMap.get('LEsw').value.max,
      S: mainMap.get('S').value.max,
    };
    const result = await remoteSolvers('/Fn_S_data', inputs);
    return result;
  },
  BM_S_data: async (mainMap) => {
    let inputs = {
      cr: mainMap.get('cr').value.max,
      Fn: mainMap.get('Fn').value.max,
      Afin: mainMap.get('Afin').value.max,
      TEsw: mainMap.get('TEsw').value.max,
      LEsw: mainMap.get('LEsw').value.max,
      S: mainMap.get('S').value.max,
    };
    const result = await remoteSolvers('/BM_S_data', inputs);
    return result;
  },
  Ang_S_data: async (mainMap) => {
    let inputs = {
      cr: mainMap.get('cr').value.max,
      Fn: mainMap.get('Fn').value.max,
      Afin: mainMap.get('Afin').value.max,
      TEsw: mainMap.get('TEsw').value.max,
      LEsw: mainMap.get('LEsw').value.max,
      S: mainMap.get('S').value.max,
      Mat: materials[mainMap.get('Mat').value.val],
      t: mainMap.get('t').value.max,
    };
    const result = await remoteSolvers('/Ang_S_data', inputs);
    return result;
  },
  Defl_S_data: async (mainMap) => {
    let inputs = {
      cr: mainMap.get('cr').value.max,
      Fn: mainMap.get('Fn').value.max,
      Afin: mainMap.get('Afin').value.max,
      TEsw: mainMap.get('TEsw').value.max,
      LEsw: mainMap.get('LEsw').value.max,
      S: mainMap.get('S').value.max,
      Mat: materials[mainMap.get('Mat').value.val],
      t: mainMap.get('t').value.max,
    };
    const result = await remoteSolvers('/Defl_S_data', inputs);
    return result;
  },
  Stress_S_data: async (mainMap) => {
    let inputs = {
      cr: mainMap.get('cr').value.max,
      Fn: mainMap.get('Fn').value.max,
      Afin: mainMap.get('Afin').value.max,
      TEsw: mainMap.get('TEsw').value.max,
      LEsw: mainMap.get('LEsw').value.max,
      S: mainMap.get('S').value.max,
      t: mainMap.get('t').value.max,
    };
    const result = await remoteSolvers('/Stress_S_data', inputs);
    return result;
  },
};
