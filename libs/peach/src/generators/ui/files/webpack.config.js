const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const { merge } = require('webpack-merge');
const path = require('path');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {

  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  return merge(config,{
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, '/src/assets'),
        '@core': path.resolve(__dirname, '/src/app/core'),
        '@infrastructure': path.resolve(__dirname, '/src/app/infrastructure'),
        '@presentation': path.resolve(__dirname, '/src/app/presentation'),
      },
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
  });
});
