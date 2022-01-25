# taqueria/flextesa

This is the source used to build the docker image used by the @taqueria/plugin-flextesa package. It's built on top of oxhead's flextesa docker image, but uses a node entrypoint called startFlextesa.js, which allows arguments to be specified to configure accounts and their initial balances

To build, run `npm run build` which will build both the startFlextesa.js file and the docker iamge itself.

The image generated will be called `taqueria/flextesa`.