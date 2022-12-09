// out/types/RuntimeDependencyReport.ts
import { toParseErr, toParseUnknownErr } from "@taqueria/protocol/TaqError";
import { resolve, reject } from "fluture";
import { ZodError } from "zod";
import { runtimeDependencyReportSchema } from "@taqueria/protocol/out/types-zod";
var from = (input) => {
  try {
    return runtimeDependencyReportSchema.parse(input);
  } catch (previous) {
    if (previous instanceof ZodError) {
      const msgs = previous.errors.reduce(
        (retval, issue) => {
          const path = issue.path.join(" \u2192 ");
          const msg = path + ": " + issue.message;
          return [...retval, msg];
        },
        ["RuntimeDependencyReport is invalid:"]
      );
      const validationErr = msgs.join("\n") + "\n";
      throw toParseErr(previous, validationErr);
    }
    throw toParseUnknownErr(previous, "There was a problem trying to parse a RuntimeDependencyReport.");
  }
};
var create = (input) => from(input);
var of = (input) => {
  try {
    return resolve(from(input));
  } catch (err) {
    return reject(err);
  }
};
var make = (input) => of(input);
var schemas = {
  rawSchema: runtimeDependencyReportSchema,
  schema: runtimeDependencyReportSchema.transform((val) => val)
};
var rawSchema = schemas.rawSchema;
var internalSchema = runtimeDependencyReportSchema;
export {
  create,
  from,
  internalSchema,
  make,
  of,
  rawSchema,
  schemas
};
//# sourceMappingURL=RuntimeDependencyReport.mjs.map