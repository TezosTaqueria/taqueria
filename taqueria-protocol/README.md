# Taqueria Protocol

This package provides TypeScript "types" to both the Taqueria CLI and the Taqueria Node SDK.

This package is consumable in Node and Deno, and therefore care must
be taken to assure that any changes made to the types do not depend
solely on a Node or Deno API.

Each type is validated using either of the following [Zod](https://github.com/colinhacks/zod#default) schemas:
- An internal schema, which parses a typed structure from other typed structures
- A raw schema, which parses a structure composed of primitive type

Each type is represented as its own module, with the rawSchema and type exported, along with two factory methods: make() and create().

To validate against the internal schema, use make(). To validate against the raw schema, use create().

## Tips

Zod schemas expose a default() method. This doesn't work well when the optional() method is used as well. As such, please use the transform() method to set default values.

E.g.

Instead of this: `z.string().default('contracts').optional()`

Use this: `z.string().optional().transform(val => val ?? 'contracts')`