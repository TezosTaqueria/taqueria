// out/types-zod.ts
import { z } from "zod";
var nonEmptyStringSchema = z.string().min(1);
var singleCharSchema = nonEmptyStringSchema.regex(/^[A-Za-z]$/);
var verbSchema = nonEmptyStringSchema.regex(/^[A-Za-z\-\ ]+/);
var aliasSchema = z.union([verbSchema, singleCharSchema]);
var humanReadableIdentifierSchema = nonEmptyStringSchema.regex(
  /^[A-Za-z]+[A-Za-z0-9-_ ]*$/
);
var sanitizedAbsPathSchema = nonEmptyStringSchema;
var sanitizedPathSchema = nonEmptyStringSchema;
var settingsSchema = z.object({
  consent: z.union([z.literal("opt_in"), z.literal("opt_out")])
});
var timestampSchema = z.number().min(1651846877);
var tzSchema = nonEmptyStringSchema.min(1).regex(/^\d([\d_]+\d)?$/);
var versionNumberSchema = nonEmptyStringSchema.min(1).regex(/^\d+\.\d+(\.\d+)*$/);
var urlSchema = nonEmptyStringSchema.url();
var commandSchema = nonEmptyStringSchema;
var optionSchema = z.object({
  shortFlag: singleCharSchema.optional(),
  flag: verbSchema,
  description: nonEmptyStringSchema,
  defaultValue: z.union([z.string(), z.number(), z.boolean()]).optional(),
  type: z.union([z.literal("string"), z.literal("number"), z.literal("boolean")]).optional(),
  required: z.boolean().optional(),
  boolean: z.boolean().optional(),
  choices: z.array(nonEmptyStringSchema).optional()
});
var positionalArgSchema = z.object({
  placeholder: humanReadableIdentifierSchema,
  description: nonEmptyStringSchema,
  defaultValue: z.union([z.string(), z.number(), z.boolean()]).optional(),
  type: z.union([z.literal("string"), z.literal("number"), z.literal("boolean")]).optional(),
  required: z.boolean().optional()
});
var installedPluginSchema = z.object({
  type: z.union([z.literal("npm"), z.literal("binary"), z.literal("deno")]),
  name: nonEmptyStringSchema
});
var runtimeDependencySchema = z.object({
  name: humanReadableIdentifierSchema,
  path: z.string(),
  version: z.string(),
  kind: z.union([z.literal("required"), z.literal("optional")])
});
var runtimeDependencyReportSchema = runtimeDependencySchema.extend(
  {
    met: z.boolean()
  }
);
var pluginDependenciesResponseSchema = z.object({
  report: z.array(runtimeDependencyReportSchema)
});
var pluginJsonResponseSchema = z.union([
  z.object({
    data: z.unknown().optional(),
    render: z.union([z.literal("none"), z.literal("table"), z.literal("string")]).default("none")
  }),
  z.void()
]);
var pluginProxyResponseSchema = z.union([
  z.void(),
  pluginJsonResponseSchema
]);
var pluginResponseEncodingSchema = z.union([z.literal("none"), z.literal("json"), z.literal("application/json")]).default("none");
var buildNumberSchema = z.number();
var sanitizedArgsSchema = z.object({
  _: z.array(z.string()),
  projectDir: sanitizedPathSchema,
  maxConcurrency: z.number(),
  debug: z.boolean(),
  disableState: z.boolean(),
  logPluginRequests: z.boolean(),
  fromVsCode: z.boolean(),
  version: z.boolean(),
  build: z.boolean(),
  help: z.boolean(),
  yes: z.boolean(),
  plugin: nonEmptyStringSchema.optional(),
  env: nonEmptyStringSchema,
  quickstart: nonEmptyStringSchema,
  setBuild: z.union([nonEmptyStringSchema, buildNumberSchema]),
  setVersion: nonEmptyStringSchema
}).passthrough();
var pluginActionNameSchema = z.union([
  z.literal("proxy"),
  z.literal("pluginInfo"),
  z.literal("checkRuntimeDependencies"),
  z.literal("installRuntimeDependencies"),
  z.literal("proxyTemplate")
]);
var economicalProtocolHashSchema = z.string();
var publicKeyHashSchema = z.string().regex(/^tz\d[A-Za-z0-9]{33}$/);
var sha256Schema = z.string().regex(/^[A-Fa-f0-9]{64}$/);
var contractSchema = z.object({
  sourceFile: nonEmptyStringSchema,
  hash: sha256Schema
});
var faucetSchema = z.object({
  pkh: publicKeyHashSchema,
  mnemonic: z.array(z.string()),
  email: z.string().email(),
  password: z.string(),
  amount: z.string().regex(/^\d+$/),
  activation_code: z.string()
});
var tzKtConfigPostgresqlPortSchema = z.number().default(5432);
var tzKtConfigApiPortSchema = z.number().default(5e3);
var tzKtConfigSchema = z.object({
  disableAutostartWithSandbox: z.boolean().optional(),
  postgresqlPort: tzKtConfigPostgresqlPortSchema.optional(),
  apiPort: tzKtConfigApiPortSchema.optional()
});
var environmentSchema = z.object({
  networks: z.array(nonEmptyStringSchema),
  sandboxes: z.array(nonEmptyStringSchema),
  storage: z.record(nonEmptyStringSchema).optional(),
  aliases: z.record(z.record(nonEmptyStringSchema)).optional()
});
var persistedTaskSchema = z.object({
  task: verbSchema,
  plugin: nonEmptyStringSchema,
  time: timestampSchema,
  output: z.unknown().optional()
});
var persistedOperationSchema = z.object({
  hash: sha256Schema,
  time: timestampSchema,
  output: z.unknown().optional()
});
var provisionerIDSchema = z.string().min(1).regex(
  /^[A-Za-z0-9]+[A-Za-z0-9-_]+\.[A-Za-z0-9]+[A-Za-z0-9-_]+\.[A-Za-z0-9]+[A-Za-z0-9-_]+$/
);
var provisionerSchema = z.object({
  id: provisionerIDSchema,
  plugin: nonEmptyStringSchema,
  operation: z.union([nonEmptyStringSchema, z.literal("custom")]),
  command: z.string().optional(),
  label: z.string().optional(),
  depends_on: z.array(provisionerIDSchema).optional()
});
var provisionsSchema = z.array(provisionerSchema);
var environmentNameSchema = nonEmptyStringSchema.min(
  1,
  "Default environment must reference the name of an existing environment."
);
var humanLanguageSchema = z.union([z.literal("en"), z.literal("fr")]).default("en");
var configContractsDirSchema = z.string().min(1).default("contracts");
var configArtifactsDirSchema = z.string().min(1).default("artifacts");
var metadataConfigSchema = z.object({
  name: z.string().optional(),
  projectDescription: z.string().optional(),
  authors: z.array(z.string()).optional(),
  license: z.string().optional(),
  homepage: z.string().optional()
});
var networkAccountConfigSchema = z.object({
  publicKey: nonEmptyStringSchema,
  publicKeyHash: publicKeyHashSchema,
  privateKey: nonEmptyStringSchema
});
var sandboxAccountConfigSchema = z.object({
  encryptedKey: nonEmptyStringSchema,
  publicKeyHash: publicKeyHashSchema,
  secretKey: nonEmptyStringSchema
});
var sandboxConfigSchema = z.object({
  label: nonEmptyStringSchema,
  rpcUrl: urlSchema,
  protocol: economicalProtocolHashSchema,
  attributes: z.union([z.string(), z.number(), z.boolean()]).optional(),
  plugin: verbSchema.optional(),
  accounts: z.record(z.union([sandboxAccountConfigSchema, nonEmptyStringSchema])).optional(),
  tzkt: tzKtConfigSchema.optional()
});
var scaffoldConfigSchema = z.object({
  postInit: z.string().optional()
});
var taskSchema = z.object({
  task: verbSchema,
  command: commandSchema,
  aliases: z.array(aliasSchema).optional(),
  description: nonEmptyStringSchema.min(3).optional(),
  example: nonEmptyStringSchema.optional(),
  hidden: z.boolean().optional(),
  encoding: pluginResponseEncodingSchema.optional(),
  handler: z.union([z.literal("proxy"), nonEmptyStringSchema]),
  options: z.array(optionSchema).optional(),
  positionals: z.array(positionalArgSchema).optional()
});
var persistentStateSchema = z.object({
  operations: z.record(persistedOperationSchema),
  tasks: z.record(persistedTaskSchema)
});
var networkConfigSchema = z.object({
  label: humanReadableIdentifierSchema,
  rpcUrl: urlSchema,
  protocol: economicalProtocolHashSchema,
  accounts: z.record(networkAccountConfigSchema).optional(),
  faucet: faucetSchema.optional()
});
var pluginSchemaBaseSchema = z.object({
  name: nonEmptyStringSchema,
  version: versionNumberSchema,
  schema: versionNumberSchema,
  alias: aliasSchema,
  tasks: z.array(taskSchema).optional()
});
var configSchema = z.object({
  language: humanLanguageSchema.optional(),
  plugins: z.array(installedPluginSchema).optional(),
  contractsDir: configContractsDirSchema.optional(),
  artifactsDir: configArtifactsDirSchema.optional(),
  network: z.record(networkConfigSchema).optional(),
  sandbox: z.record(sandboxConfigSchema).optional(),
  environment: z.record(z.union([environmentSchema, environmentNameSchema])),
  accounts: z.record(tzSchema).optional(),
  contracts: z.record(contractSchema).optional(),
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
    sandbox: z.record(z.union([sandboxConfigSchema, nonEmptyStringSchema]))
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
var operationSchema = z.object({
  operation: verbSchema,
  command: commandSchema,
  description: nonEmptyStringSchema.optional(),
  positionals: z.array(positionalArgSchema).optional(),
  options: z.array(optionSchema).optional(),
  handler: z.function().args(persistentStateSchema).returns(z.function().args(requestArgsSchema).returns(z.void())).optional()
});
var parsedOperationSchema = operationSchema.omit({ handler: true });
var templateHandlerSchema = z.union([
  nonEmptyStringSchema,
  z.function().args(requestArgsSchema).returns(
    z.union([pluginJsonResponseSchema, z.promise(pluginJsonResponseSchema)])
  ),
  z.promise(z.void())
]);
var templateSchema = z.object({
  template: verbSchema,
  command: commandSchema,
  description: nonEmptyStringSchema,
  hidden: z.boolean().optional(),
  options: z.array(optionSchema).optional(),
  positionals: z.array(positionalArgSchema).optional(),
  handler: templateHandlerSchema,
  encoding: pluginResponseEncodingSchema.optional()
});
var parsedTemplateSchema = templateSchema.omit({ handler: true }).extend(
  {
    handler: z.string()
  }
);
var pluginInfoSchema = pluginSchemaBaseSchema.extend(
  {
    operations: z.array(parsedOperationSchema).optional(),
    templates: z.array(parsedTemplateSchema).optional()
  }
);
var pluginSchemaSchema = pluginSchemaBaseSchema.extend(
  {
    operations: z.array(operationSchema).optional(),
    templates: z.array(templateSchema).optional(),
    proxy: z.function().args(requestArgsSchema).returns(z.promise(pluginProxyResponseSchema)).optional(),
    checkRuntimeDependencies: z.function().args(requestArgsSchema).returns(z.promise(pluginDependenciesResponseSchema)).optional(),
    installRuntimeDependencies: z.function().args(requestArgsSchema).returns(z.promise(pluginDependenciesResponseSchema)).optional()
  }
);
var ephemeralStateSchema = z.object({
  build: z.string(),
  configHash: z.string(),
  tasks: z.record(installedPluginSchema.and(taskSchema)),
  operations: z.record(installedPluginSchema.and(parsedOperationSchema)),
  templates: z.record(installedPluginSchema.and(parsedTemplateSchema)),
  plugins: z.array(pluginInfoSchema)
});
export {
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
};
//# sourceMappingURL=types-zod.mjs.map