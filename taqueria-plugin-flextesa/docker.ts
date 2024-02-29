import { getDockerImage } from '@taqueria/node-sdk';
import { Opts } from './types';

export const TAQ_FLEXTESA_IMAGE_ENV_VAR = 'TAQ_FLEXTESA_IMAGE';

export const getDefaultDockerImage = (opts: Opts) => `registry.gitlab.com/tezos/flextesa:018ac39a-run`;

export const getImage = (opts: Opts) => getDockerImage(getDefaultDockerImage(opts), TAQ_FLEXTESA_IMAGE_ENV_VAR);
