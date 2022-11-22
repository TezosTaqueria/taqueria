---
title: Toolkit
---

Toolkit is an API library to retrieve states in `config.json`. To install it, run the following in your front-end app directory.

```shell
npm install @taqueria/toolkit
```

It exposes a list of functions:

```ts
const getAliasAddress: (config: any, alias: string) => string;
```

:::tip
https://github.com/ecadlabs/taqueria-scaffold-taco-shop is a scaffold that shows an example of how to use this library. It uses `getAliasAddress` to facilitate hot reloading.
:::