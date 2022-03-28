import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';

export const CnaTot = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/CnaTot/1', buildInputs(props, vars));
      updateMax(props, 'CnaTot', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/CnaTot/1', buildMirrorInputs(props, vars));
      updateMin(props, 'CnaTot', result.val);
      return result;
    },
  },
};
