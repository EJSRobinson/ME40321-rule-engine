import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';

export const Fn = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/Fn/1', buildInputs(props, vars));
      return updateMax(props, 'Fn', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/Fn/1', buildMirrorInputs(props, vars));
      return updateMin(props, 'Fn', result.val);
    },
  },
};
