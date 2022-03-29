import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';

export const cr = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/cr/1', buildInputs(props, vars));
      updateMax(props, 'cr', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/cr/1', buildMirrorInputs(props, vars));
      updateMin(props, 'cr', result.val);
      return result;
    },
  },
  2: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/cr/2', buildInputs(props, vars));
      updateMax(props, 'cr', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/cr/2', buildMirrorInputs(props, vars));
      updateMin(props, 'cr', result.val);
      return result;
    },
  },
  3: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/cr/3', buildInputs(props, vars));
      updateMax(props, 'cr', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/cr/3', buildMirrorInputs(props, vars));
      updateMin(props, 'cr', result.val);
      return result;
    },
  },
  4: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/cr/4', buildInputs(props, vars));
      updateMax(props, 'cr', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/cr/4', buildMirrorInputs(props, vars));
      updateMin(props, 'cr', result.val);
      return result;
    },
  },
  5: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/cr/5', buildInputs(props, vars));
      updateMax(props, 'cr', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/cr/5', buildMirrorInputs(props, vars));
      updateMin(props, 'cr', result.val);
      return result;
    },
  },
  6: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/cr/6', buildInputs(props, vars));
      updateMax(props, 'cr', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/cr/6', buildMirrorInputs(props, vars));
      updateMin(props, 'cr', result.val);
      return result;
    },
  },
};
