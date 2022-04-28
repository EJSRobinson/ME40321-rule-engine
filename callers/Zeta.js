import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';

export const Zeta = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/Zeta/1', buildInputs(props, vars));
      return updateMax(props, 'Zeta', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/Zeta/1', buildMirrorInputs(props, vars));
      return updateMin(props, 'Zeta', result.val);
    },
  },
};
