const webpack = require('webpack'),
    commonConfig = require('./webpack.common.config.js'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path'),
    merge = require('webpack-merge');

module.exports = merge(commonConfig, {
    module: {
        rules: [
            {
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 1 }
                        },
                        {
                            loader: 'postcss-loader',
                            options: { config: { path: path.join(__dirname, './postcss.config.js') } }
                        },
                        'less-loader',
                    ],
                    fallback: 'style-loader',
                }),
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
    ],

    devtool: 'source-map',
});

