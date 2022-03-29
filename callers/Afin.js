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
      updateMax(props, 'Afin', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/Afin/1', buildMirrorInputs(props, vars));
      updateMin(props, 'Afin', result.val);
      return result;
    },
  },
  2: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/Afin/2', buildInputs(props, vars));
      updateMax(props, 'Afin', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/Afin/2', buildMirrorInputs(props, vars));
      updateMin(props, 'Afin', result.val);
      return result;
    },
  },
  3: {
    normal: async (props, vars) => {
      // Replace material with density
      let inputs = buildInputs(props, vars);
      let density = materials[inputs['Mat']].density;
      inputs['Mat'] = density;
      const result = await remoteSolvers('/Afin/3', inputs);
      updateMax(props, 'Afin', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      // Replace material with density
      let inputs = buildMirrorInputs(props, vars);
      let density = materials[inputs['Mat']].density;
      inputs['Mat'] = density;
      const result = await remoteSolvers('/Afin/3', buildMirrorInputs(props, inputs));
      updateMin(props, 'Afin', result.val);
      return result;
    },
  },
  4: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/Afin/4', buildInputs(props, vars));
      updateMax(props, 'Afin', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/Afin/4', buildMirrorInputs(props, vars));
      updateMin(props, 'Afin', result.val);
      return result;
    },
  },
  5: {
    normal: async (props, vars) => {
      const result = await remoteSolvers('/Afin/5', buildInputs(props, vars));
      updateMax(props, 'Afin', result.val);
      return result;
    },
    mirror: async (props, vars) => {
      const result = await remoteSolvers('/Afin/5', buildMirrorInputs(props, vars));
      updateMin(props, 'Afin', result.val);
      return result;
    },
  },
};
