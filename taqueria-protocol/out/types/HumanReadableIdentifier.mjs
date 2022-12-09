// out/types/HumanReadableIdentifier.ts
import { toParseErr, toParseUnknownErr } from "@taqueria/protocol/TaqError";
import { resolve, reject } from "fluture";
import { ZodError } from "zod";
import { humanReadableIdentifierSchema } from "@taqueria/protocol/out/types-zod";
var from = (input) => {
  try {
    return humanReadableIdentifierSchema.parse(input);
  } catch (previous) {
    if (previous instanceof ZodError) {
      const msgs = previous.errors.reduce(
        (retval, issue) => {
          const path = issue.path.join(" \u2192 ");
          const msg = path + ": " + issue.message;
          return [...retval, msg];
        },
        ["HumanReadableIdentifier is invalid:"]
      );
      const validationErr = msgs.join("\n") + "\n";
      throw toParseErr(previous, validationErr);
    }
    throw toParseUnknownErr(previous, "There was a problem trying to parse a HumanReadableIdentifier.");
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
  rawSchema: humanReadableIdentifierSchema,
  schema: humanReadableIdentifierSchema.transform((val) => val)
};
var rawSchema = schemas.rawSchema;
var internalSchema = humanReadableIdentifierSchema;
export {
  create,
  from,
  internalSchema,
  make,
  of,
  rawSchema,
  schemas
};
//# sourceMappingURL=HumanReadableIdentifier.mjs.map