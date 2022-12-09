"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// out/types/PersistentState.ts
var PersistentState_exports = {};
__export(PersistentState_exports, {
  create: () => create,
  from: () => from,
  internalSchema: () => internalSchema,
  make: () => make,
  of: () => of,
  rawSchema: () => rawSchema,
  schemas: () => schemas
});
module.exports = __toCommonJS(PersistentState_exports);
var import_TaqError = require("@taqueria/protocol/TaqError");
var import_fluture = require("fluture");
var import_zod = require("zod");
var import_types_zod = require("@taqueria/protocol/out/types-zod");
var from = (input) => {
  try {
    return import_types_zod.persistentStateSchema.parse(input);
  } catch (previous) {
    if (previous instanceof import_zod.ZodError) {
      const msgs = previous.errors.reduce(
        (retval, issue) => {
          const path = issue.path.join(" \u2192 ");
          const msg = path + ": " + issue.message;
          return [...retval, msg];
        },
        ["PersistentState is invalid:"]
      );
      const validationErr = msgs.join("\n") + "\n";
      throw (0, import_TaqError.toParseErr)(previous, validationErr);
    }
    throw (0, import_TaqError.toParseUnknownErr)(previous, "There was a problem trying to parse a PersistentState.");
  }
};
var create = (input) => from(input);
var of = (input) => {
  try {
    return (0, import_fluture.resolve)(from(input));
  } catch (err) {
    return (0, import_fluture.reject)(err);
  }
};
var make = (input) => of(input);
var schemas = {
  rawSchema: import_types_zod.persistentStateSchema,
  schema: import_types_zod.persistentStateSchema.transform((val) => val)
};
var rawSchema = schemas.rawSchema;
var internalSchema = import_types_zod.persistentStateSchema;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  from,
  internalSchema,
  make,
  of,
  rawSchema,
  schemas
});
//# sourceMappingURL=PersistentState.js.map