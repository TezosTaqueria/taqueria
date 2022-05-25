# Taqueria Protocol

This package provides TypeScript "types" to both the Taqueria CLI and the Taqueria Node SDK.

This package is consumable in Node and Deno, and therefore care must
be taken to assure that any changes made to the types do not depend
solely on a Node or Deno API.

## Zod Types and Schemas

Each type is validated using either of the following [Zod](https://github.com/colinhacks/zod#default) schemas:

### Raw Schema

A schema that parses and _validates_ input using _built-in data types_.

### Internal Schema

A schema that extends the rawSchema but parses data into custom-defined _concrete types_. 

### Schema

A schema which extends the internalSchema, and _casts_ the data into its custom-defined concrete type


#### Example:

Let's say that we're trying to parse a Person, expecting a JSON object as input. For simplicity, lets say that define a Person with the following shape:
```
Person: {
    firstName: Name.t,
    lastName: Name.t
}
```

Both fields are of type Name.t.


Name.t would have a rawSchema that parses input as a string, with a minimum length of 2, and match against a regex to ensure that the string begins with an uppercase letter, and that only alphabetical characters, hyphons, and spaces are allowed. The rawSchema is essentially parsing the input into a built-in type, a string in this case, and validating that the string represents the data expected.

The internalSchema of the Name.t type would be the same as the rawSchema in this place, as the rawSchema is parsing the input into a scalar value and simple type, rather than a complex type, such as an object.

The schema of the Name.t type would take the value as output from the internalSchema, which would be a validated string in this case, and cast it to a Name.t.

---

The _rawSchema_ of a Person.t would parse the input as an object, with two required fields, and would validate those fields using the rawSchema provided by the Name.t type:

```
// rawSchema for Person.t
export const rawSchema = z.object({
    firstName: Name.rawSchema,
    lastName: Name.rawSchema
})
```

The _internalSchema_ extends the rawSchema by parsing the two fields into their proper concrete types:

```
// internalSchema for Person.t
export const internalSchema = z.object({
    firstName: Name.schema,
    lastName: Name.schema
})

Recall that the _schema_ returns a value casted to its appropriate concrete type. Thus, the internalSchema above can be inferred as a Zod Schema with two Name.t fields.
```

Finally, the _schema_ will cast the object to its own concerete type, Person.t:
```
// schema for Person.t
export const schema = internalSchema.transform(val => val as Person.t)
```


#### Factory methods

Each type module has the following methods which map input to a parsed value of it's associated type:
- `make()` - accepts a value as input that can be inferred to a type represented by the internalSchema. Returns a `Future<TaqError, T>`. Should be used internally by the CLI
- `create()` - accepts a value as input with an unknown shape. Throws on failure. Should be used by plugin authors, not internally in the CLI.
- `of()` - accepts a value as input with an unknown shape. Returns a `Future<TaqError, T>`. Typically used by the CLI when parsing input from files such as config.json.

## Tips

Zod schemas expose a default() method. This doesn't work well when the optional() method is used as well. As such, please use the transform() method to set default values.

E.g.

Instead of this: `z.string().default('contracts').optional()`

Use this: `z.string().optional().transform(val => val ?? 'contracts')`