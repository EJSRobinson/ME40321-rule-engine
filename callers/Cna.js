import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';

export const Cna = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/Cna/1', buildInputs(props, vars));
      return updateMax(props, 'Cna', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/Cna/1', buildMirrorInputs(props, vars));
      return updateMin(props, 'Cna', result.val);
    },
  },
  2: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/Cna/2', buildInputs(props, vars));
      return updateMax(props, 'Cna', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/Cna/2', buildMirrorInputs(props, vars));
      return updateMin(props, 'Cna', result.val);
    },
  },
  3: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/Cna/3', buildInputs(props, vars));
      return updateMax(props, 'Cna', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/Cna/3', buildMirrorInputs(props, vars));
      return updateMin(props, 'Cna', result.val);
    },
  },
};
