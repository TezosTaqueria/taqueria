import * as Environment from '@taqueria/protocol/Environment';
import type { i18n } from '@taqueria/protocol/i18n';
import * as LoadedConfig from '@taqueria/protocol/LoadedConfig';
import * as NetworkConfig from '@taqueria/protocol/NetworkConfig';
import * as Operation from '@taqueria/protocol/Operation';
import * as Option from '@taqueria/protocol/Option';
import * as PersistentState from '@taqueria/protocol/PersistentState';
import * as PluginInfo from '@taqueria/protocol/PluginInfo';
import * as PluginSchema from '@taqueria/protocol/PluginSchema';
import * as PositionalArg from '@taqueria/protocol/PositionalArg';
import * as RequestArgs from '@taqueria/protocol/RequestArgs';
import * as SandboxAccountConfig from '@taqueria/protocol/SandboxAccountConfig';
import * as SandboxConfig from '@taqueria/protocol/SandboxConfig';
import * as SanitizedAbsPath from '@taqueria/protocol/SanitizedAbsPath';
import * as SanitizedPath from '@taqueria/protocol/SanitizedPath';
import * as TaqError from '@taqueria/protocol/TaqError';
import * as Protocol from '@taqueria/protocol/taqueria-protocol-types';
import * as Task from '@taqueria/protocol/Task';
import * as Template from '@taqueria/protocol/Template';
import { P } from 'ts-pattern';
import { z } from 'zod';
export {
	Environment,
	LoadedConfig,
	NetworkConfig,
	Operation,
	Option,
	PersistentState,
	PluginSchema,
	PositionalArg,
	Protocol,
	RequestArgs,
	SandboxAccountConfig,
	SandboxConfig,
	SanitizedAbsPath,
	SanitizedPath,
	TaqError,
	Task,
	Template,
};

export interface LikeAPromise<Success, TaqError> extends Promise<Success> {
}

export type PositiveInt = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

export type i18nMessage = string | { message: string; numOfArguments: PositiveInt };

export type Args = string[];

export interface StdIO {
	stdout: string;
	stderr: string;
}

export type pluginDefiner = ((i18n: i18n) => PluginSchema.RawPluginSchema);
