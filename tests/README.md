# Taqueria Tests
## Usage:
Since the taqueria project is currently making use of NPM workspaces all activity is generally going to take place in the root (taqueria) directory. Commands will not function normally if run from the tests directory and the following commands will be what you can use to install all dependencies and run the tests for taqueria:
### Installation
- From the taqueria root directory (eg. `~/taqueria`) installing the dependencies for the project can be accomplished with the normal `npm install`. By default `npm install` will install everything, if you're making changes and want to check something out then the targeted NPM install will be handy
- If you're going to be running the unit tests you need to make sure that deno is installed on your system. Installation instructions can be found [here](https://deno.land/manual@v1.18.2/getting_started/installation)
- Installing specific plugins/tools needed for testing can be accomplished with the workspace modified NPM install: `npm install -w {workspace_name}` defined in the project top level package.json file (make sure to check this is the case before doing anything). For the tests directory the workspace has been defined as `tests` so the command will be `npm install -w tests`.
- This will put all dependencies in the project level `node_modules/` folder so the test code will need to be searching for dependencies there. This is covered in the `tsconfig.test.json` file which points to the node modules folder a level up from the tests folder like so:
```
    "typeRoots": ["../node_modules/@types"],
    "types": ["node", "jest", "ts-jest"]
```

- An example combining the above
```
$ npm install
$ npm install -w taqueria-plugin-ligo
$ npm install -w taqueria-plugin-mock
$ npm install -w tests
```

### Running the Tests:
- The tests should be run from the taqueria root folder by calling the test run script with the workspace specified: `npm run test:{unit|integration|e2e} -w tests`
    - If you're going to be running the unit tests then you will need deno installed on your system