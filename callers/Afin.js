import { remoteSolvers } from '../api-client.js';
import { buildInputs } from './common.js';
import { buildMirrorInputs } from './common.js';
import { updateMax } from './common.js';
import { updateMin } from './common.js';
import { materials } from 'me40321-database/materials-core.js';

export const Afin = {
  1: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/Afin/1', buildInputs(props, vars));
      return updateMax(props, 'Afin', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/Afin/1', buildMirrorInputs(props, vars));
      return updateMin(props, 'Afin', result.val);
    },
  },
  2: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/Afin/2', buildInputs(props, vars));
      return updateMax(props, 'Afin', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/Afin/2', buildMirrorInputs(props, vars));
      return updateMin(props, 'Afin', result.val);
    },
  },
  3: {
    normal: async (props, vars) => {
      // Replace material with density
      let inputs = buildInputs(props, vars);
      let density = materials[inputs['Mat']].density;
      inputs['Mat'] = density;
      const result = await remoteSolvers('/Afin/3', inputs);
      return updateMax(props, 'Afin', result.val);
    },
    mirror: async (props, vars) => {
      // Replace material with density
      let inputs = buildMirrorInputs(props, vars);
      let density = materials[inputs['Mat']].density;
      inputs['Mat'] = density;
      const result = await remoteSolvers('/Afin/3', buildMirrorInputs(props, inputs));
      return updateMin(props, 'Afin', result.val);
    },
  },
  4: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/Afin/4', buildInputs(props, vars));
      return updateMax(props, 'Afin', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/Afin/4', buildMirrorInputs(props, vars));
      return updateMin(props, 'Afin', result.val);
    },
  },
  5: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/Afin/5', buildInputs(props, vars));
      return updateMax(props, 'Afin', result.val);
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/Afin/5', buildMirrorInputs(props, vars));
      return updateMin(props, 'Afin', result.val);
    },
  },
};
