import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';

export const CtaTot = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/CtaTot/1', buildInputs(props, vars));
      return updateMax(props, 'CtaTot', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/CtaTot/1', buildMirrorInputs(props, vars));
      return updateMin(props, 'CtaTot', result.val);
    },
  },
};
