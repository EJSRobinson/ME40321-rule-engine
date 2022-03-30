import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';

export const TEsw = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/TEsw/1', buildInputs(props, vars));
      return updateMax(props, 'TEsw', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/TEsw/1', buildMirrorInputs(props, vars));
      return updateMin(props, 'TEsw', result.val);
    },
  },
  2: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/TEsw/2', buildInputs(props, vars));
      return updateMax(props, 'TEsw', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/TEsw/2', buildMirrorInputs(props, vars));
      return updateMin(props, 'TEsw', result.val);
    },
  },
  3: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/TEsw/3', buildInputs(props, vars));
      return updateMax(props, 'TEsw', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/TEsw/3', buildMirrorInputs(props, vars));
      return updateMin(props, 'TEsw', result.val);
    },
  },
};
