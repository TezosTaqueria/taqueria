# Taqueria Contract Types Plugin

This plugin provides a `taq generate types` command which will generate and export TypeScript types from compiled Michelson smart contracts. These generated types then work with your IDE and Taquito, providing type safety and an improved code authoring experience

Benefits of using generated types:
- Static types used to call smart contract methods are checked at compile time, improving code reliability
- Generated types enable auto-completion and syntax highlighting in your IDE
- Developing apps with Taquito is faster and more reliable
- The VS Code Extension provides tooltip hints for parameter types used to call a smart contract method
- Calling smart contract methods with types is done directly, removing the need for utility methods 
- Simplifies your code and improves readability

For more information, please see our documentation for the [Taqueria Contract Types plugin](https://taqueria.io/docs/plugins/plugin-contract-types/)