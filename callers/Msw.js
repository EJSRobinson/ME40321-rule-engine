import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';

export const Msw = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/Msw/1', buildInputs(props, vars));
      return updateMax(props, 'Msw', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/Msw/1', buildMirrorInputs(props, vars));
      return updateMin(props, 'Msw', result.val);
    },
  },
};
