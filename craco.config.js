/* For ease of future upgrades we're keeping webpack.config.js under node_modules package
control and not making edits to it directly.

DO NOT 'eject' the config files. You will regret it when they inevitably 
change the public API, and do a crap job at documenting it for noobs.

This only became necessary because of polyfills for the PDF/stream functionality. 
We need to move that file creation stuff to the server-side and stop fattening the 
.js bundles with junk that the server is more suited toward doing. */

/* https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration */
const webpack = require('webpack')
const path = require('path');

module.exports = {
    babel: {
        "presets": [
            "@babel/preset-env",
            "@babel/preset-react"
          ],
          "plugins": [
            "babel-plugin-styled-components",
            ["@babel/plugin-proposal-class-properties", { "loose": true }],
            ["@babel/plugin-proposal-private-methods", { "loose": true }],
            ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
            "@babel/plugin-transform-regenerator",
            "@babel/plugin-transform-destructuring"
          ]
    },
    webpack: {
        configure: (webpackConfig, { env, paths }) => { 
            webpackConfig.ignoreWarnings = [/Failed to parse source map/]
            webpackConfig.plugins.push(new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }))
            webpackConfig.resolve.fallback = {
                "zlib": require.resolve("browserify-zlib"),
                "stream": require.resolve("stream-browserify"),
                "buffer": require.resolve("buffer/"),
            };
            webpackConfig.resolve.alias = {
                /* https://mui.com/guides/styled-engine/ */
                '@mui/styled-engine': '@mui/styled-engine-sc'
            };
            //Set the build folder to dist/
            paths.appBuild = webpackConfig.output.path = path.resolve('dist/');
            return webpackConfig;  // Important: return the modified config
        }
    },
}