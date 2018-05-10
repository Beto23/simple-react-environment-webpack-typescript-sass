const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['react-hot-loader/patch','./app/app.tsx'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'docs'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    },
                    {
                        loader: 'ts-loader'
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|)(\?.*)?$/,
                use: 'file-loader?name=fonts/[name][hash].[ext]'
            },
            {
                test: /\.svg(\?.*)?$/,
                use: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[hash].[ext]'
            },
            {
                test: /\.pdf(\?.*)?$/,
                use: 'file-loader?name=documents/[name][hash].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: 'url-loader?limit=8000&name=images/[hash].[ext]'
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./app/index.html",
            filename: 'index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    optimization: { // Checar bien
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }
    }
};