import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';

export const Cd = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/Cd/1', buildInputs(props, vars));
      return updateMax(props, 'Cd', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/Cd/1', buildMirrorInputs(props, vars));
      return updateMin(props, 'Cd', result.val);
    },
  },
};
