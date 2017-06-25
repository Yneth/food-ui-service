const webpack = require('webpack'),
    path = require('path'),
    commonConfig = require('./webpack.common.config.js'),
    merge = require('webpack-merge');

module.exports = merge(commonConfig, {

    module: {
        rules: [
            {
                test: /\.less/,
                use: ['style-loader','css-loader', 'less-loader'],
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"dev"',
        }),
    ],

    devServer: {
        contentBase: path.join(__dirname, 'build'),
        port: 3000,
        proxy: {
            '!**/*.(js|css|html|ico)': 'http://localhost:5000',
        },
    },

    node: {
        // workaround for webpack-dev-server issue
        // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
        fs: 'empty',
        net: 'empty'
    },

    watch: true,
    cache: true,
    devtool: 'cheap-inline-module-source-map',
});
