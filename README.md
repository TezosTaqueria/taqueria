# Taqueria

> WARNING: This project is alpha-quality at the moment. APIs are unstable and likely to change.
## Build instructions

- Requirements:
    - Deno
- Run `./bin/build.sh` from the root directory of this project. This will generate a `taqueria` executable.

## Suggestions

I like adding my project directory to the PATH environment variable which allows me to execute `taqueria` from any directory. Do the following to set that up:

1. Run `pwd` from the root directory of this project. This will output a path which you'll need to select and copy.
2. run `echo 'export PATH=$PATH:[paste path here]' >> ~/.bashrc`. 

> E.g. On my computer, this would be: `echo 'export PATH=$PATH:/Users/mweichert/Projects/taqueria' >> ~/.bashrc`

## Create a project
1. Initialize a new project: `taqueria init test-project`
2. Change directories: `cd test-project`
3. Initialize the project as an NPM project: `npm init -y`
4. Install the LIGO plugin: `npm i -D ../taqueria-plugin-ligo`
5. Activate the LIGO plugin by adding the following to the plugins array in ./.taq/config.json:
```json
{
    "name": "taqueria-plugin-ligo",
    "type": "npm"
}
```

> NOTE: We will be implementing a `taqueria install` task which will do steps 3-5 for you.
6. Continue steps 4-5 for each additional plugin you want to install


## Plugin Instructions

### Create a plugin (inside repo)

These are temporary instuctions until the taq cli `taqueria init plugin` is ready

- clone `taqueria-plugin-mock`
- setup plugin name:
    - `index.ts` > `Plugin.create` > `name`
    - `package.json` > `name`
- setup plugin tasks:
    - `index.ts` > `Plugin.create` > `tasks`
    - Examine other plugins for example tasks and task arguments

### Using Plugin in an npm project

Note: The following demonstrates using the plugin `taqueria-plugin-contract-type-generator` as an example.

- Run Build Instructions above and setup taqueria in path (i.e. .bashrc)
- Create npm project
    - `mkdir example-taq-project`
    - `cd example-taq-project`
    - `npm init` (answer prompt questions to create npm project)
- Taq'ify the project
    - `taqueria init`
- Add plugin to project
    - Add plugin as npm project reference
        ```json
        "dependencies": {
            "taqueria-plugin-contract-type-generator": "file:../taqueria-plugin-contract-type-generator",
        }
        ```
    - Run npm install
        - `npm i`
    - Add plugin to `.taq/config.json`
        
        ```json
        "plugins": [
            {
                "type": "npm",
                "name": "taqueria-plugin-contract-type-generator"
            }
        ]
        ```
- Build/rebuild plugin after code changes
    - Inside plugin directory
    - `npm run build`
- View plugin tasks
    - `taqueria --help`
- Run plugin task
    - `taqueria typegen --typescriptDir ./types`