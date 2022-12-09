import { TaqError } from '@taqueria/protocol/TaqError';
import { FutureInstance } from 'fluture';
import { PluginActionName } from '@taqueria/protocol/types';
import { PluginActionName as PluginActionNameStrict } from '@taqueria/protocol/out/types-strict';
export type { PluginActionNameStrict as PluginActionName };
export declare const from: (input: unknown) => PluginActionNameStrict;
export declare const create: (input: PluginActionName) => PluginActionNameStrict;
export declare const of: (input: unknown) => FutureInstance<TaqError, PluginActionNameStrict>;
export declare const make: (input: Omit<PluginActionNameStrict, '__type'>) => FutureInstance<TaqError, PluginActionNameStrict>;
export declare const schemas: {
    rawSchema: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodLiteral<"pluginInfo">, import("zod").ZodLiteral<"checkRuntimeDependencies">, import("zod").ZodLiteral<"installRuntimeDependencies">, import("zod").ZodLiteral<"proxyTemplate">]>;
    schema: import("zod").ZodEffects<import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodLiteral<"pluginInfo">, import("zod").ZodLiteral<"checkRuntimeDependencies">, import("zod").ZodLiteral<"installRuntimeDependencies">, import("zod").ZodLiteral<"proxyTemplate">]>, ({
        __type: PluginActionNameStrict;
    } & "proxy") | ({
        __type: PluginActionNameStrict;
    } & "pluginInfo") | ({
        __type: PluginActionNameStrict;
    } & "checkRuntimeDependencies") | ({
        __type: PluginActionNameStrict;
    } & "installRuntimeDependencies") | ({
        __type: PluginActionNameStrict;
    } & "proxyTemplate"), "proxy" | "pluginInfo" | "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxyTemplate">;
};
export declare const rawSchema: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodLiteral<"pluginInfo">, import("zod").ZodLiteral<"checkRuntimeDependencies">, import("zod").ZodLiteral<"installRuntimeDependencies">, import("zod").ZodLiteral<"proxyTemplate">]>;
export declare const internalSchema: import("zod").ZodUnion<[import("zod").ZodLiteral<"proxy">, import("zod").ZodLiteral<"pluginInfo">, import("zod").ZodLiteral<"checkRuntimeDependencies">, import("zod").ZodLiteral<"installRuntimeDependencies">, import("zod").ZodLiteral<"proxyTemplate">]>;
export type t = PluginActionNameStrict;
//# sourceMappingURL=PluginActionName.d.ts.map