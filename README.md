<p align="center">
  <a href="https://taqueria.io">
    <img alt="Taqueria" src="https://user-images.githubusercontent.com/1114943/150659418-e55f1df3-ba4d-4e05-ab26-1f729858c7fb.png" width="" />
  </a>
</p>
<h1 align="center">
  Taqueria - A New Way to Build on Tezos
</h1>

> WARNING: This project has not officially been made public. Congratulations on finding it. Have a look around, but be aware, it's not yet ready for public consumption.! CLIs and APIs are unstable and likely to change.
## Build instructions

- Install [deno](https://deno.land/#installation)
- Run `./bin/build.sh` from the root directory of this project. This will generate a `taq` executable.

## Suggestions

I like adding my project directory to the PATH environment variable which allows me to execute `taq` from any directory. Do the following to set that up:

1. Run `pwd` from the root directory of this project. This will output a path which you'll need to select and copy.
2. Run `echo 'export PATH=$PATH:[paste path here]' >> ~/.bashrc`. This will add `taq` to your PATH so that you can execute it anywhere.
3. Reload your .bashrc file. Run: `source ~/.bashrc`

> E.g. On my computer, this would be: `echo 'export PATH=$PATH:/Users/mweichert/Projects/taqueria' >> ~/.bashrc`

> NOTE: If you're on Mac Catalina or later, you'll need to use .zshrc instead of .bashrc

> We'll be creating installer packages for Taqueria soon!

## Create a project
1. Initialize a new project: `taq init test-project`
2. Change directories: `cd test-project`
3. Initialize the project as an NPM project: `npm init -y`
4. Install the LIGO plugin: `taq install ../taqueria-plugin-ligo` if installing from a clone of this repo, otherwise use `taq install @taqueria/plugin-ligo`
6. Continue steps 4-5 for each additional plugin you want to install

