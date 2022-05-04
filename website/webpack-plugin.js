const webpackPlugin = (context, opts) => {
  return {
    name: "webpack-plugin",
    configureWebpack(config, isServer, utils, content) {
      // Modify internal webpack config. If returned value is an Object, it
      // will be merged into the final config using webpack-merge;
      // If the returned value is a function, it will receive the config as the 1st argument and an isServer flag as the 2nd argument.
      return {
        node: {
          __dirname: true
        },
        resolve: {
          fallback: {
            stream: require.resolve("stream-browserify"),
            path: require.resolve("path-browserify"),
            buffer: require.resolve("buffer/"),
            crypto: require.resolve("crypto-browserify")
          }
        }
      };
    }
  };
};

module.exports = webpackPlugin;
