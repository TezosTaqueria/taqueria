import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { Command } from '@taqueria/protocol/types';
import { Command as CommandStrict } from '@taqueria/protocol/out/types-strict';
export type { CommandStrict as Command };
export declare const from: (input: unknown) => CommandStrict;
export declare const create: (input: Command) => CommandStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, CommandStrict>;
export declare const make: (input: Omit<CommandStrict, '__type'>) => FutureInstance<TaqError, CommandStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodString;
    schema: import("zod").ZodEffects<import("zod").ZodString, CommandStrict, string>;
};
export declare const rawSchema: import("zod").ZodString;
export declare const internalSchema: import("zod").ZodString;
export type t = CommandStrict;
//# sourceMappingURL=Command.d.ts.map