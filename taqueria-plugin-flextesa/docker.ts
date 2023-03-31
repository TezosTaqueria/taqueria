import { getDockerImage } from '@taqueria/node-sdk';
import { Opts } from './types';

export const ECAD_FLEXTESA_IMAGE_ENV_VAR = 'TAQ_ECAD_FLEXTESA_IMAGE';

export const getDefaultDockerImage = (opts: Opts) => `oxheadalpha/flextesa:20230313`;

export const getImage = (opts: Opts) => getDockerImage(getDefaultDockerImage(opts), ECAD_FLEXTESA_IMAGE_ENV_VAR);
