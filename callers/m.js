import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';

export const m = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/m/1', buildInputs(props, vars));
      updateMax(props, 'm', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/m/1', buildMirrorInputs(props, vars));
      updateMin(props, 'm', result.val);
      return result;
    },
  },
  2: {
    normal: async (props, vars) => {
      let inputs = buildInputs(props, vars);
      let density = materials[inputs['Mat']].density;
      inputs['Mat'] = density;
      const result = await remoteSolvers('/m/2', inputs);
      updateMax(props, 'm', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      let inputs = buildMirrorInputs(props, vars);
      let density = materials[inputs['Mat']].density;
      inputs['Mat'] = density;
      const result = await remoteSolvers('/m/2', inputs);
      updateMin(props, 'm', result.val);
      return result;
    },
  },
};
