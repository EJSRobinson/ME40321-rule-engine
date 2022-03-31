import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';
import { materials } from 'me40321-database/materials-core.js';

export const Ct = {
  1: {
    normal: async (props, vars) => {
      let inputs = buildInputs(props, vars);
      let Rs = materials[inputs['Mat']].surfaceRoughness;
      inputs['Mat'] = Rs;
      const result = await remoteSolvers('/Ctang/1', inputs);
      return updateMax(props, 'Ct', result.val);
    },
    mirror: async (props, vars) => {
      let inputs = buildMirrorInputs(props, vars);
      let Rs = materials[inputs['Mat']].surfaceRoughness;
      inputs['Mat'] = Rs;
      const result = await remoteSolvers('/Ctang/1', inputs);
      return updateMin(props, 'Ct', result.val);
    },
  },
};
