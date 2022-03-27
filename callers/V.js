import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';

export const V = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/V/1', buildInputs(props, vars));
      updateMax(props, 'V', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/V/1', buildMirrorInputs(props, vars));
      updateMin(props, 'V', result.val);
      return result;
    },
  },
};
