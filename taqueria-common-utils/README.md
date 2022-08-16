
# Common Utilities

> Functions shared between both deno and node runtime

## Functions

**Pipe**
It combines n functions, calling each function with the output of the last one.

**Encode**
Take a string to be encoded and return a Uint8Array.

**Noop** 
A helper function to return void in pipe.

**Format functions**
Format msg in a standardized way that can be output to the console.
E.g., formatMsg might return a msg that is using escape sequences to indicate that the color should be white.

**Output functions**
Writes an encoded msg (Uint8Array) to a writer, such as stdout or stderr.
E.g. outputMsg() would accept a encoded msg as an argument, and write it to a Writer.

**Render functions**
Formats a msg using a format function, and outputs the msg using an output function.
E.g. renderMsg() would accept a msg of an unknown type, format it using the given formatter, and output it using the given outputter.
