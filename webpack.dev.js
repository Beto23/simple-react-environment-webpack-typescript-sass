const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test:  /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'resolve-url-loader', 'postcss-loader?sourceMap', 'sass-loader?sourceMap']
            }
        ]
    },
    plugins: [
        new DashboardPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
        port: 9000,
        host: '0.0.0.0',
        hot: true,
        disableHostCheck: true, 
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: true,
            version: false,
            warnings: true,
            colors: {
                green: '\u001b[32m',
            },
        },
    }
});