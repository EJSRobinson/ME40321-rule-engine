import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';

export const LEsw = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/LEsw/1', buildInputs(props, vars));
      updateMax(props, 'LEsw', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/LEsw/1', buildMirrorInputs(props, vars));
      updateMin(props, 'LEsw', result.val);
      return result;
    },
  },
  2: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/LEsw/2', buildInputs(props, vars));
      updateMax(props, 'LEsw', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/LEsw/2', buildMirrorInputs(props, vars));
      updateMin(props, 'LEsw', result.val);
      return result;
    },
  },
  3: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/LEsw/3', buildInputs(props, vars));
      updateMax(props, 'LEsw', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/LEsw/3', buildMirrorInputs(props, vars));
      updateMin(props, 'LEsw', result.val);
      return result;
    },
  },
};
