/**
 * webpack.config.js — Empacotamento e minificação para produção
 *
 * Entrada: TypeScript compilado (tsc gera ./dist/ compilado de ./src/)
 * Saída: ./dist/extension.js (single bundle)
 */

// @ts-check
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
    mode: 'production',
    target: 'node',
    entry: './dist/extension.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2',
        clean: false
    },
    externals: {
        vscode: 'commonjs vscode'
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ecma: 2022,
                    compress: {
                        drop_console: false,
                        passes: 2
                    },
                    format: {
                        comments: false
                    }
                },
                extractComments: false
            })
        ]
    },
    devtool: 'source-map',
    performance: {
        hints: 'warning',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};
