import { getDockerImage } from '@taqueria/node-sdk';
import { Opts } from './types';

export const TAQ_FLEXTESA_IMAGE_ENV_VAR = 'TAQ_FLEXTESA_IMAGE';

export const getDefaultDockerImage = (opts: Opts) => `oxheadalpha/flextesa:20230607`;

export const getImage = (opts: Opts) => getDockerImage(getDefaultDockerImage(opts), TAQ_FLEXTESA_IMAGE_ENV_VAR);
