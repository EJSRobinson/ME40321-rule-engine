import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';

export const cr = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/S/1', buildInputs(props, vars));
      updateMax(props, 'S', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/S/1', buildMirrorInputs(props, vars));
      updateMin(props, 'S', result.val);
      return result;
    },
  },
  2: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/S/2', buildInputs(props, vars));
      updateMax(props, 'S', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/S/2', buildMirrorInputs(props, vars));
      updateMin(props, 'S', result.val);
      return result;
    },
  },
};
