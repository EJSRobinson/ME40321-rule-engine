import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';

export const ct = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/ct/1', buildInputs(props, vars));
      updateMax(props, 'ct', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/ct/1', buildMirrorInputs(props, vars));
      updateMin(props, 'ct', result.val);
      return result;
    },
  },
  2: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/ct/2', buildInputs(props, vars));
      updateMax(props, 'ct', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/ct/2', buildMirrorInputs(props, vars));
      updateMin(props, 'ct', result.val);
      return result;
    },
  },
  3: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/ct/3', buildInputs(props, vars));
      updateMax(props, 'ct', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/ct/3', buildMirrorInputs(props, vars));
      updateMin(props, 'ct', result.val);
      return result;
    },
  },
  4: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/ct/4', buildInputs(props, vars));
      updateMax(props, 'ct', result);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/ct/4', buildMirrorInputs(props, vars));
      updateMin(props, 'ct', result);
      return result;
    },
  },
  5: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/ct/5', buildInputs(props, vars));
      updateMax(props, 'ct', result);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/ct/5', buildMirrorInputs(props, vars));
      updateMin(props, 'ct', result);
      return result;
    },
  },
  6: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/ct/6', buildInputs(props, vars));
      updateMax(props, 'ct', result);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/ct/6', buildMirrorInputs(props, vars));
      updateMin(props, 'ct', result);
      return result;
    },
  },
};
