<p align="center">
  <a href="https://taqueria.io">
    <img alt="Taqueria" src="https://user-images.githubusercontent.com/1114943/150659418-e55f1df3-ba4d-4e05-ab26-1f729858c7fb.png" width="" />
  </a>
</p>
<h1 align="center">
  Taqueria - A New Way to Build on Tezos
</h1>
# Taqueria

> WARNING: This project is alpha quality. CLIs and APIs are unstable and likely to change.
## Build instructions

- Install [deno](https://deno.land/#installation)
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

