const webpack = require('webpack'),
    commonConfig = require('./webpack.common.config.js'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    merge = require('webpack-merge');

module.exports = merge(commonConfig, {
    module: {
        rules: [
            {
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader!less-loader',
                    fallback: 'style-loader',
                }),
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"prod"',
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
    ],

    devtool: 'source-map',
});

