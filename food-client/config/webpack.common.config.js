const webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path');

module.exports = {
    entry: {
        bundle: ['./src/index.js'],
    },

    output: {
        path: path.join(__dirname, '../dist/'),
        publicPath: '/',
        filename: '[name].js',
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            'ui-library': path.join(__dirname, '../src/ui-library'),
            'components': path.join(__dirname, '../src/components'),
            'services': path.join(__dirname, '../src/services'),
            'features': path.join(__dirname, '../src/features'),
        }
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=env&plugins[]=transform-object-rest-spread&plugins[]=transform-react-jsx',
            },
            {
                test: /\.(svg|png|gif|jpeg|jpg|bmp)$/,
                exclude: /node_modules/,
                loader: 'file-loader?limit=8192&name=[name]-[hash].[ext]',
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
    ],
};

