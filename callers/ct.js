import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';

export const ct = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/ct/1', buildInputs(props, vars));
      return updateMax(props, 'ct', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/ct/1', buildMirrorInputs(props, vars));
      return updateMin(props, 'ct', result.val);
    },
  },
  2: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/ct/2', buildInputs(props, vars));
      return updateMax(props, 'ct', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/ct/2', buildMirrorInputs(props, vars));
      return updateMin(props, 'ct', result.val);
    },
  },
  3: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/ct/3', buildInputs(props, vars));
      return updateMax(props, 'ct', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/ct/3', buildMirrorInputs(props, vars));
      return updateMin(props, 'ct', result.val);
    },
  },
  4: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/ct/4', buildInputs(props, vars));
      return updateMax(props, 'ct', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/ct/4', buildMirrorInputs(props, vars));
      return updateMin(props, 'ct', result.val);
    },
  },
  5: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/ct/5', buildInputs(props, vars));
      return updateMax(props, 'ct', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/ct/5', buildMirrorInputs(props, vars));
      return updateMin(props, 'ct', result.val);
    },
  },
  6: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/ct/6', buildInputs(props, vars));
      return updateMax(props, 'ct', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/ct/6', buildMirrorInputs(props, vars));
      return updateMin(props, 'ct', result.val);
    },
  },
};
