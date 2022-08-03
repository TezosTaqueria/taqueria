
# Common Utilities

> Functions shared between both deno and node runtime

## Functions

**Encode**
Take a string to be encoded and return a Uint8Array.

**Noop** 
A helper function to return void in pipe.

**Formatter**
Format msg in a standardized way that can be output to the console.
E.g., formatMsg might return a msg that is using escape sequences to indicate that the color should be white.

**Outputter**
Writes a msg (encoded string) to a writer, such as stdout or stderr.
E.g. outputMsg() would accept a encoded string as an argument, and write it to a Writer.

**Render**
Formats a msg using a formatter, and outputs the msg using an outputter.
E.g. renderMsg() would accept a msg of an unknown type, format it using the given formatter, and output it using the given outputter.
