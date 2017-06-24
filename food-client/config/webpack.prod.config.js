const webpack = require('webpack'),
    commonConfig = require('./webpack.common.config.js'),
    merge = require('webpack-merge');

module.exports = merge(commonConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"prod"',
        }),
        new webpack.optimize.UglifyJsPlugin(),
    ],

    devtool: 'source-map',
});

