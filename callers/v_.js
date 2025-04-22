import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';
import { materials } from 'me40321-database/materials-core.js';

export const v = {
  1: {
    normal: async (props, vars) => {
      let inputs = buildInputs(props, vars);
      inputs['Mat'] = materials[inputs['Mat']];
      const result = await remoteSolvers('/defl/1', inputs);
      return updateMax(props, 'v', result.val);
    },
    mirror: async (props, vars) => {
      let inputs = buildMirrorInputs(props, vars);
      inputs['Mat'] = materials[inputs['Mat']];
      const result = await remoteSolvers('/defl/1', inputs);
      return updateMin(props, 'v', result.val);
    },
  },
};
