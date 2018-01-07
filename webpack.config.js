// We are using node's native package 'path' https://nodejs.org/api/path.html
const path      = require('path');
const webpack   = require('webpack'); //to access built-in plugins

// Plugins
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const DashboardPlugin       = require('webpack-dashboard/plugin');
const OpenBrowserPlugin     = require('open-browser-webpack-plugin');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');

// NODE ENV
const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';


// Constant with our paths
const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    APP: path.resolve(__dirname, 'src/'),
};

// common plugins
const plugins = [
    // Simplifies creation of HTML files to serve your webpack bundles
    new HtmlWebpackPlugin({
        hash: true,
        template: path.join(paths.APP, 'index.html'),
        filename: 'index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
]

//common rules
const rules = [
    {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'awesome-typescript-loader?{tsconfig: "tsconfig.json"}' // falta de instalar
    },
    {
        test: /\.(png|gif|jpe?g|svg|ico)$/,
        use: 'url-loader?limit=20480&name=images/[name]-[hash].[ext]', // falta de instalar urlloader
    },
    {
        test: /\.(svg|woff|woff2|ttf|eot)$/,
        exclude: /node:modules/,
        use: 'url-loader?limit=100000&name=fonts/[name].[ext]'
    }
]

if (isProduction) {
    // Production plugins
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false,
            },
        }),
        new ExtractTextPlugin('style-[hash].css')
    );

    //Production Rules
    rules.push(
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!sass-loader',
                publicPath: '/dist'
            }),
        }
    );
} else {
    // Development plugins
    plugins.push(
        new DashboardPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:9000' })
    );

    // Development rules
    rules.push(
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }
    )
}

// Webpack configuration
module.exports = {
    devtool: isProduction ? false : 'source-map',
    entry: path.join(paths.APP, 'app.tsx'),
    output: {
        path: paths.DIST,
        filename: 'app.bundle.js'
    },
    plugins,
    module: {
        rules
    },
    resolve: {
        extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', ".ts", ".tsx", ".js", ".json"],
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
        port: 9000,
        compress: isProduction,
        inline: !isProduction,
        host: '0.0.0.0',
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
};

// https://stanko.github.io/webpack-babel-react-revisited/