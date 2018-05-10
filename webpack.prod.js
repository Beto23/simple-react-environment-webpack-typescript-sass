const path = require('path');

const merge             = require('webpack-merge');
const webpack           = require('webpack');
const ImageminPlugin    = require('imagemin-webpack-plugin').default
const common            = require('./webpack.common');

const ExtractTextPlugin             = require('extract-text-webpack-plugin');
const CleanWebpackPlugin            = require('clean-webpack-plugin');
const CopyWebpackPlugin             = require('copy-webpack-plugin');
const UglifyJsPlugin                = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'docs'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'resolve-url-loader', 'postcss-loader?sourceMap', 'sass-loader?sourceMap']
                }),
            },
        ]
    },
    plugins: [
        new ImageminPlugin({
            pngquant: {
                quality: '95-100'
            }
        }),
        new CleanWebpackPlugin(['docs']),
        new ExtractTextPlugin('style-[hash].css'),
        new CopyWebpackPlugin([
            './.htaccess'
        ]),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ]
    }
});