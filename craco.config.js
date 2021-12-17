/* For ease of future upgrades we're keeping webpack.config.js under node_modules package
control and not making edits to it directly.

DO NOT 'eject' the config files. You will regret it when they inevitably 
change the public API, and do a crap job at documenting it for noobs.

This only became necessary because of polyfills for the PDF/stream functionality. 
We need to move that file creation stuff to the server-side and stop fattening the 
.js bundles with junk that the server is more suited toward doing. */

/* https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration */
const webpack = require('webpack')

module.exports = {
    webpack: {
        configure: {
            ignoreWarnings: [/Failed to parse source map/],
            plugins: [
                new webpack.ProvidePlugin({
                    Buffer: ['buffer', 'Buffer'],
                })
            ],
            /*optimization: {
                splitChunks: {
                    chunks: 'all'
                }
            },*/
            resolve: {
                fallback: {
                    "zlib": require.resolve("browserify-zlib"),
                    "stream": require.resolve("stream-browserify"),
                    "buffer": require.resolve("buffer/"),
                }
            }
        },
    },
}