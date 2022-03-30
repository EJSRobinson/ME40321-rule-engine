import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';

export const S = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/S/1', buildInputs(props, vars));
      return updateMax(props, 'S', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/S/1', buildMirrorInputs(props, vars));
      return updateMin(props, 'S', result.val);
    },
  },
  2: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/S/2', buildInputs(props, vars));
      return updateMax(props, 'S', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/S/2', buildMirrorInputs(props, vars));
      return updateMin(props, 'S', result.val);
    },
  },
  5: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/S/5', buildInputs(props, vars));
      return updateMax(props, 'S', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/S/5', buildMirrorInputs(props, vars));
      return updateMin(props, 'S', result.val);
    },
  },
};
