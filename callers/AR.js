import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';

export const AR = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/AR/1', buildInputs(props, vars));
      return updateMax(props, 'AR', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/AR/1', buildMirrorInputs(props, vars));
      return updateMin(props, 'AR', result.val);
    },
  },
  2: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/AR/2', buildInputs(props, vars));
      return updateMax(props, 'AR', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/AR/2', buildMirrorInputs(props, vars));
      return updateMin(props, 'AR', result.val);
    },
  },
};
