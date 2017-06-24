const webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path');

module.exports = {
    entry: {
        bundle: ['./src/index.js'],
    },

    output: {
        path: path.join(__dirname, '../dist/'),
        filename: '[name].js',
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=env&plugins[]=transform-object-rest-spread&plugins[]=transform-react-jsx',
            },
            {
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader!less-loader',
                    fallback: 'style-loader',
                }),
            },
            {
                test: /\.(svg|png|gif|jpeg|jpg|bmp)$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=[name]-[hash].[ext]',
            },
        ],
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            },
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
        }),
        new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
    ],
};

