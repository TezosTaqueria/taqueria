---
title: Mock Plugin 
---

The mock plugin is a starting point for building new plugins. You can learn more about making plugins for Taqueria [here](/do/taqueria-dev/making-plugins/)

The basic implementation for a plugin looks like this:
```js
const {Plugin, Task, Option} = require('@taqueria/node-sdk')
Plugin.create(i18n => ({
    schema: "1.0",
    version: "0.1",
    tasks: [
        Task.create({
            task: "ping",
            command: "ping",
            aliases: ["p", "ping-test"],
            description: "Return predefined result for CLI integration testing",
            options: [
                Option.create({
                    shortFlag: "e",
                    flag: "return error ",
                    description: "The "
                }),
            ],
            handler: "pong"
        })
    ],
}), process.argv)


```

You can find the source code on Github [here](https://github.com/ecadlabs/taqueria/tree/main/taqueria-plugin-mock)