// out/types/ProxyTemplateArgs.ts
import { toParseErr, toParseUnknownErr } from "@taqueria/protocol/TaqError";
import { resolve, reject } from "fluture";
import { ZodError } from "zod";
import { proxyTemplateArgsSchema } from "@taqueria/protocol/out/types-zod";
var from = (input) => {
  try {
    return proxyTemplateArgsSchema.parse(input);
  } catch (previous) {
    if (previous instanceof ZodError) {
      const msgs = previous.errors.reduce(
        (retval, issue) => {
          const path = issue.path.join(" \u2192 ");
          const msg = path + ": " + issue.message;
          return [...retval, msg];
        },
        ["ProxyTemplateArgs is invalid:"]
      );
      const validationErr = msgs.join("\n") + "\n";
      throw toParseErr(previous, validationErr);
    }
    throw toParseUnknownErr(previous, "There was a problem trying to parse a ProxyTemplateArgs.");
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
  rawSchema: proxyTemplateArgsSchema,
  schema: proxyTemplateArgsSchema.transform((val) => val)
};
var rawSchema = schemas.rawSchema;
var internalSchema = proxyTemplateArgsSchema;
export {
  create,
  from,
  internalSchema,
  make,
  of,
  rawSchema,
  schemas
};
//# sourceMappingURL=ProxyTemplateArgs.mjs.map