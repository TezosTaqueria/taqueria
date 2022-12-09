"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// out/types-zod.ts
var types_zod_exports = {};
__export(types_zod_exports, {
  aliasSchema: () => aliasSchema,
  buildNumberSchema: () => buildNumberSchema,
  commandSchema: () => commandSchema,
  configArtifactsDirSchema: () => configArtifactsDirSchema,
  configContractsDirSchema: () => configContractsDirSchema,
  configSchema: () => configSchema,
  contractSchema: () => contractSchema,
  economicalProtocolHashSchema: () => economicalProtocolHashSchema,
  environmentSchema: () => environmentSchema,
  ephemeralStateSchema: () => ephemeralStateSchema,
  faucetSchema: () => faucetSchema,
  humanReadableIdentifierSchema: () => humanReadableIdentifierSchema,
  installedPluginSchema: () => installedPluginSchema,
  loadedConfigSchema: () => loadedConfigSchema,
  metadataConfigSchema: () => metadataConfigSchema,
  networkAccountConfigSchema: () => networkAccountConfigSchema,
  networkConfigSchema: () => networkConfigSchema,
  nonEmptyStringSchema: () => nonEmptyStringSchema,
  operationSchema: () => operationSchema,
  optionSchema: () => optionSchema,
  parsedConfigSchema: () => parsedConfigSchema,
  parsedOperationSchema: () => parsedOperationSchema,
  parsedTemplateSchema: () => parsedTemplateSchema,
  persistedOperationSchema: () => persistedOperationSchema,
  persistedTaskSchema: () => persistedTaskSchema,
  persistentStateSchema: () => persistentStateSchema,
  pluginActionNameSchema: () => pluginActionNameSchema,
  pluginDependenciesResponseSchema: () => pluginDependenciesResponseSchema,
  pluginInfoSchema: () => pluginInfoSchema,
  pluginJsonResponseSchema: () => pluginJsonResponseSchema,
  pluginProxyResponseSchema: () => pluginProxyResponseSchema,
  pluginResponseEncodingSchema: () => pluginResponseEncodingSchema,
  pluginSchemaSchema: () => pluginSchemaSchema,
  positionalArgSchema: () => positionalArgSchema,
  provisionerIDSchema: () => provisionerIDSchema,
  provisionerSchema: () => provisionerSchema,
  provisionsSchema: () => provisionsSchema,
  proxyTaskArgsSchema: () => proxyTaskArgsSchema,
  proxyTemplateArgsSchema: () => proxyTemplateArgsSchema,
  publicKeyHashSchema: () => publicKeyHashSchema,
  requestArgsSchema: () => requestArgsSchema,
  runtimeDependencyReportSchema: () => runtimeDependencyReportSchema,
  runtimeDependencySchema: () => runtimeDependencySchema,
  sandboxAccountConfigSchema: () => sandboxAccountConfigSchema,
  sandboxConfigSchema: () => sandboxConfigSchema,
  sanitizedAbsPathSchema: () => sanitizedAbsPathSchema,
  sanitizedArgsSchema: () => sanitizedArgsSchema,
  sanitizedPathSchema: () => sanitizedPathSchema,
  scaffoldConfigSchema: () => scaffoldConfigSchema,
  settingsSchema: () => settingsSchema,
  sha256Schema: () => sha256Schema,
  singleCharSchema: () => singleCharSchema,
  taskSchema: () => taskSchema,
  templateSchema: () => templateSchema,
  timestampSchema: () => timestampSchema,
  tzKtConfigSchema: () => tzKtConfigSchema,
  tzSchema: () => tzSchema,
  urlSchema: () => urlSchema,
  verbSchema: () => verbSchema,
  versionNumberSchema: () => versionNumberSchema
});
module.exports = __toCommonJS(types_zod_exports);
var import_zod = require("zod");
var nonEmptyStringSchema = import_zod.z.string().min(1);
var singleCharSchema = nonEmptyStringSchema.regex(/^[A-Za-z]$/);
var verbSchema = nonEmptyStringSchema.regex(/^[A-Za-z\-\ ]+/);
var aliasSchema = import_zod.z.union([verbSchema, singleCharSchema]);
var humanReadableIdentifierSchema = nonEmptyStringSchema.regex(
  /^[A-Za-z]+[A-Za-z0-9-_ ]*$/
);
var sanitizedAbsPathSchema = nonEmptyStringSchema;
var sanitizedPathSchema = nonEmptyStringSchema;
var settingsSchema = import_zod.z.object({
  consent: import_zod.z.union([import_zod.z.literal("opt_in"), import_zod.z.literal("opt_out")])
});
var timestampSchema = import_zod.z.number().min(1651846877);
var tzSchema = nonEmptyStringSchema.min(1).regex(/^\d([\d_]+\d)?$/);
var versionNumberSchema = nonEmptyStringSchema.min(1).regex(/^\d+\.\d+(\.\d+)*$/);
var urlSchema = nonEmptyStringSchema.url();
var commandSchema = nonEmptyStringSchema;
var optionSchema = import_zod.z.object({
  shortFlag: singleCharSchema.optional(),
  flag: verbSchema,
  description: nonEmptyStringSchema,
  defaultValue: import_zod.z.union([import_zod.z.string(), import_zod.z.number(), import_zod.z.boolean()]).optional(),
  type: import_zod.z.union([import_zod.z.literal("string"), import_zod.z.literal("number"), import_zod.z.literal("boolean")]).optional(),
  required: import_zod.z.boolean().optional(),
  boolean: import_zod.z.boolean().optional(),
  choices: import_zod.z.array(nonEmptyStringSchema).optional()
});
var positionalArgSchema = import_zod.z.object({
  placeholder: humanReadableIdentifierSchema,
  description: nonEmptyStringSchema,
  defaultValue: import_zod.z.union([import_zod.z.string(), import_zod.z.number(), import_zod.z.boolean()]).optional(),
  type: import_zod.z.union([import_zod.z.literal("string"), import_zod.z.literal("number"), import_zod.z.literal("boolean")]).optional(),
  required: import_zod.z.boolean().optional()
});
var installedPluginSchema = import_zod.z.object({
  type: import_zod.z.union([import_zod.z.literal("npm"), import_zod.z.literal("binary"), import_zod.z.literal("deno")]),
  name: nonEmptyStringSchema
});
var runtimeDependencySchema = import_zod.z.object({
  name: humanReadableIdentifierSchema,
  path: import_zod.z.string(),
  version: import_zod.z.string(),
  kind: import_zod.z.union([import_zod.z.literal("required"), import_zod.z.literal("optional")])
});
var runtimeDependencyReportSchema = runtimeDependencySchema.extend(
  {
    met: import_zod.z.boolean()
  }
);
var pluginDependenciesResponseSchema = import_zod.z.object({
  report: import_zod.z.array(runtimeDependencyReportSchema)
});
var pluginJsonResponseSchema = import_zod.z.union([
  import_zod.z.object({
    data: import_zod.z.unknown().optional(),
    render: import_zod.z.union([import_zod.z.literal("none"), import_zod.z.literal("table"), import_zod.z.literal("string")]).default("none")
  }),
  import_zod.z.void()
]);
var pluginProxyResponseSchema = import_zod.z.union([
  import_zod.z.void(),
  pluginJsonResponseSchema
]);
var pluginResponseEncodingSchema = import_zod.z.union([import_zod.z.literal("none"), import_zod.z.literal("json"), import_zod.z.literal("application/json")]).default("none");
var buildNumberSchema = import_zod.z.number();
var sanitizedArgsSchema = import_zod.z.object({
  _: import_zod.z.array(import_zod.z.string()),
  projectDir: sanitizedPathSchema,
  maxConcurrency: import_zod.z.number(),
  debug: import_zod.z.boolean(),
  disableState: import_zod.z.boolean(),
  logPluginRequests: import_zod.z.boolean(),
  fromVsCode: import_zod.z.boolean(),
  version: import_zod.z.boolean(),
  build: import_zod.z.boolean(),
  help: import_zod.z.boolean(),
  yes: import_zod.z.boolean(),
  plugin: nonEmptyStringSchema.optional(),
  env: nonEmptyStringSchema,
  quickstart: nonEmptyStringSchema,
  setBuild: import_zod.z.union([nonEmptyStringSchema, buildNumberSchema]),
  setVersion: nonEmptyStringSchema
}).passthrough();
var pluginActionNameSchema = import_zod.z.union([
  import_zod.z.literal("proxy"),
  import_zod.z.literal("pluginInfo"),
  import_zod.z.literal("checkRuntimeDependencies"),
  import_zod.z.literal("installRuntimeDependencies"),
  import_zod.z.literal("proxyTemplate")
]);
var economicalProtocolHashSchema = import_zod.z.string();
var publicKeyHashSchema = import_zod.z.string().regex(/^tz\d[A-Za-z0-9]{33}$/);
var sha256Schema = import_zod.z.string().regex(/^[A-Fa-f0-9]{64}$/);
var contractSchema = import_zod.z.object({
  sourceFile: nonEmptyStringSchema,
  hash: sha256Schema
});
var faucetSchema = import_zod.z.object({
  pkh: publicKeyHashSchema,
  mnemonic: import_zod.z.array(import_zod.z.string()),
  email: import_zod.z.string().email(),
  password: import_zod.z.string(),
  amount: import_zod.z.string().regex(/^\d+$/),
  activation_code: import_zod.z.string()
});
var tzKtConfigPostgresqlPortSchema = import_zod.z.number().default(5432);
var tzKtConfigApiPortSchema = import_zod.z.number().default(5e3);
var tzKtConfigSchema = import_zod.z.object({
  disableAutostartWithSandbox: import_zod.z.boolean().optional(),
  postgresqlPort: tzKtConfigPostgresqlPortSchema.optional(),
  apiPort: tzKtConfigApiPortSchema.optional()
});
var environmentSchema = import_zod.z.object({
  networks: import_zod.z.array(nonEmptyStringSchema),
  sandboxes: import_zod.z.array(nonEmptyStringSchema),
  storage: import_zod.z.record(nonEmptyStringSchema).optional(),
  aliases: import_zod.z.record(import_zod.z.record(nonEmptyStringSchema)).optional()
});
var persistedTaskSchema = import_zod.z.object({
  task: verbSchema,
  plugin: nonEmptyStringSchema,
  time: timestampSchema,
  output: import_zod.z.unknown().optional()
});
var persistedOperationSchema = import_zod.z.object({
  hash: sha256Schema,
  time: timestampSchema,
  output: import_zod.z.unknown().optional()
});
var provisionerIDSchema = import_zod.z.string().min(1).regex(
  /^[A-Za-z0-9]+[A-Za-z0-9-_]+\.[A-Za-z0-9]+[A-Za-z0-9-_]+\.[A-Za-z0-9]+[A-Za-z0-9-_]+$/
);
var provisionerSchema = import_zod.z.object({
  id: provisionerIDSchema,
  plugin: nonEmptyStringSchema,
  operation: import_zod.z.union([nonEmptyStringSchema, import_zod.z.literal("custom")]),
  command: import_zod.z.string().optional(),
  label: import_zod.z.string().optional(),
  depends_on: import_zod.z.array(provisionerIDSchema).optional()
});
var provisionsSchema = import_zod.z.array(provisionerSchema);
var environmentNameSchema = nonEmptyStringSchema.min(
  1,
  "Default environment must reference the name of an existing environment."
);
var humanLanguageSchema = import_zod.z.union([import_zod.z.literal("en"), import_zod.z.literal("fr")]).default("en");
var configContractsDirSchema = import_zod.z.string().min(1).default("contracts");
var configArtifactsDirSchema = import_zod.z.string().min(1).default("artifacts");
var metadataConfigSchema = import_zod.z.object({
  name: import_zod.z.string().optional(),
  projectDescription: import_zod.z.string().optional(),
  authors: import_zod.z.array(import_zod.z.string()).optional(),
  license: import_zod.z.string().optional(),
  homepage: import_zod.z.string().optional()
});
var networkAccountConfigSchema = import_zod.z.object({
  publicKey: nonEmptyStringSchema,
  publicKeyHash: publicKeyHashSchema,
  privateKey: nonEmptyStringSchema
});
var sandboxAccountConfigSchema = import_zod.z.object({
  encryptedKey: nonEmptyStringSchema,
  publicKeyHash: publicKeyHashSchema,
  secretKey: nonEmptyStringSchema
});
var sandboxConfigSchema = import_zod.z.object({
  label: nonEmptyStringSchema,
  rpcUrl: urlSchema,
  protocol: economicalProtocolHashSchema,
  attributes: import_zod.z.union([import_zod.z.string(), import_zod.z.number(), import_zod.z.boolean()]).optional(),
  plugin: verbSchema.optional(),
  accounts: import_zod.z.record(import_zod.z.union([sandboxAccountConfigSchema, nonEmptyStringSchema])).optional(),
  tzkt: tzKtConfigSchema.optional()
});
var scaffoldConfigSchema = import_zod.z.object({
  postInit: import_zod.z.string().optional()
});
var taskSchema = import_zod.z.object({
  task: verbSchema,
  command: commandSchema,
  aliases: import_zod.z.array(aliasSchema).optional(),
  description: nonEmptyStringSchema.min(3).optional(),
  example: nonEmptyStringSchema.optional(),
  hidden: import_zod.z.boolean().optional(),
  encoding: pluginResponseEncodingSchema.optional(),
  handler: import_zod.z.union([import_zod.z.literal("proxy"), nonEmptyStringSchema]),
  options: import_zod.z.array(optionSchema).optional(),
  positionals: import_zod.z.array(positionalArgSchema).optional()
});
var persistentStateSchema = import_zod.z.object({
  operations: import_zod.z.record(persistedOperationSchema),
  tasks: import_zod.z.record(persistedTaskSchema)
});
var networkConfigSchema = import_zod.z.object({
  label: humanReadableIdentifierSchema,
  rpcUrl: urlSchema,
  protocol: economicalProtocolHashSchema,
  accounts: import_zod.z.record(networkAccountConfigSchema).optional(),
  faucet: faucetSchema.optional()
});
var pluginSchemaBaseSchema = import_zod.z.object({
  name: nonEmptyStringSchema,
  version: versionNumberSchema,
  schema: versionNumberSchema,
  alias: aliasSchema,
  tasks: import_zod.z.array(taskSchema).optional()
});
var configSchema = import_zod.z.object({
  language: humanLanguageSchema.optional(),
  plugins: import_zod.z.array(installedPluginSchema).optional(),
  contractsDir: configContractsDirSchema.optional(),
  artifactsDir: configArtifactsDirSchema.optional(),
  network: import_zod.z.record(networkConfigSchema).optional(),
  sandbox: import_zod.z.record(sandboxConfigSchema).optional(),
  environment: import_zod.z.record(import_zod.z.union([environmentSchema, environmentNameSchema])),
  accounts: import_zod.z.record(tzSchema).optional(),
  contracts: import_zod.z.record(contractSchema).optional(),
  metadata: metadataConfigSchema.optional()
});
var loadedConfigSchema = configSchema.extend(
  {
    projectDir: sanitizedAbsPathSchema,
    configFile: sanitizedAbsPathSchema,
    hash: sha256Schema
  }
);
var parsedConfigSchema = configSchema.omit({ sandbox: true }).extend(
  {
    sandbox: import_zod.z.record(import_zod.z.union([sandboxConfigSchema, nonEmptyStringSchema]))
  }
);
var requestArgsSchema = sanitizedArgsSchema.omit({ quickstart: true }).extend(
  {
    taqRun: pluginActionNameSchema,
    config: loadedConfigSchema
  }
).passthrough();
var proxyTaskArgsSchema = requestArgsSchema.extend(
  {
    task: nonEmptyStringSchema
  }
).passthrough();
var proxyTemplateArgsSchema = requestArgsSchema.extend(
  {
    template: nonEmptyStringSchema
  }
).passthrough();
var operationSchema = import_zod.z.object({
  operation: verbSchema,
  command: commandSchema,
  description: nonEmptyStringSchema.optional(),
  positionals: import_zod.z.array(positionalArgSchema).optional(),
  options: import_zod.z.array(optionSchema).optional(),
  handler: import_zod.z.function().args(persistentStateSchema).returns(import_zod.z.function().args(requestArgsSchema).returns(import_zod.z.void())).optional()
});
var parsedOperationSchema = operationSchema.omit({ handler: true });
var templateHandlerSchema = import_zod.z.union([
  nonEmptyStringSchema,
  import_zod.z.function().args(requestArgsSchema).returns(
    import_zod.z.union([pluginJsonResponseSchema, import_zod.z.promise(pluginJsonResponseSchema)])
  ),
  import_zod.z.promise(import_zod.z.void())
]);
var templateSchema = import_zod.z.object({
  template: verbSchema,
  command: commandSchema,
  description: nonEmptyStringSchema,
  hidden: import_zod.z.boolean().optional(),
  options: import_zod.z.array(optionSchema).optional(),
  positionals: import_zod.z.array(positionalArgSchema).optional(),
  handler: templateHandlerSchema,
  encoding: pluginResponseEncodingSchema.optional()
});
var parsedTemplateSchema = templateSchema.omit({ handler: true }).extend(
  {
    handler: import_zod.z.string()
  }
);
var pluginInfoSchema = pluginSchemaBaseSchema.extend(
  {
    operations: import_zod.z.array(parsedOperationSchema).optional(),
    templates: import_zod.z.array(parsedTemplateSchema).optional()
  }
);
var pluginSchemaSchema = pluginSchemaBaseSchema.extend(
  {
    operations: import_zod.z.array(operationSchema).optional(),
    templates: import_zod.z.array(templateSchema).optional(),
    proxy: import_zod.z.function().args(requestArgsSchema).returns(import_zod.z.promise(pluginProxyResponseSchema)).optional(),
    checkRuntimeDependencies: import_zod.z.function().args(requestArgsSchema).returns(import_zod.z.promise(pluginDependenciesResponseSchema)).optional(),
    installRuntimeDependencies: import_zod.z.function().args(requestArgsSchema).returns(import_zod.z.promise(pluginDependenciesResponseSchema)).optional()
  }
);
var ephemeralStateSchema = import_zod.z.object({
  build: import_zod.z.string(),
  configHash: import_zod.z.string(),
  tasks: import_zod.z.record(installedPluginSchema.and(taskSchema)),
  operations: import_zod.z.record(installedPluginSchema.and(parsedOperationSchema)),
  templates: import_zod.z.record(installedPluginSchema.and(parsedTemplateSchema)),
  plugins: import_zod.z.array(pluginInfoSchema)
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  aliasSchema,
  buildNumberSchema,
  commandSchema,
  configArtifactsDirSchema,
  configContractsDirSchema,
  configSchema,
  contractSchema,
  economicalProtocolHashSchema,
  environmentSchema,
  ephemeralStateSchema,
  faucetSchema,
  humanReadableIdentifierSchema,
  installedPluginSchema,
  loadedConfigSchema,
  metadataConfigSchema,
  networkAccountConfigSchema,
  networkConfigSchema,
  nonEmptyStringSchema,
  operationSchema,
  optionSchema,
  parsedConfigSchema,
  parsedOperationSchema,
  parsedTemplateSchema,
  persistedOperationSchema,
  persistedTaskSchema,
  persistentStateSchema,
  pluginActionNameSchema,
  pluginDependenciesResponseSchema,
  pluginInfoSchema,
  pluginJsonResponseSchema,
  pluginProxyResponseSchema,
  pluginResponseEncodingSchema,
  pluginSchemaSchema,
  positionalArgSchema,
  provisionerIDSchema,
  provisionerSchema,
  provisionsSchema,
  proxyTaskArgsSchema,
  proxyTemplateArgsSchema,
  publicKeyHashSchema,
  requestArgsSchema,
  runtimeDependencyReportSchema,
  runtimeDependencySchema,
  sandboxAccountConfigSchema,
  sandboxConfigSchema,
  sanitizedAbsPathSchema,
  sanitizedArgsSchema,
  sanitizedPathSchema,
  scaffoldConfigSchema,
  settingsSchema,
  sha256Schema,
  singleCharSchema,
  taskSchema,
  templateSchema,
  timestampSchema,
  tzKtConfigSchema,
  tzSchema,
  urlSchema,
  verbSchema,
  versionNumberSchema
});
//# sourceMappingURL=types-zod.js.map