import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';

export const Kn = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/Kn/1', buildInputs(props, vars));
      return updateMax(props, 'Kn', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/Kn/1', buildMirrorInputs(props, vars));
      return updateMin(props, 'Kn', result.val);
    },
  },
  2: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/Kn/2', buildInputs(props, vars));
      return updateMax(props, 'Kn', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/Kn/2', buildMirrorInputs(props, vars));
      return updateMin(props, 'Kn', result.val);
    },
  },
};
