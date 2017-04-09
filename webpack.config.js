let environment = process.env.NODE_ENV || 'dev',
    extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname + '/assets/js',
    entry: './app',
    output: {
        path: __dirname + '/source',
        filename: '/js/[name].js',
        library: '[name]'
    },
    watch: environment === 'dev',
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['es2015', 'react', 'stage-0', 'stage-1']
                }
            },
            {
                test: /\.css$/,
                loader: extractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
            }
        ]
    },
    plugins: [
        new extractTextPlugin('/css/[name].css')
    ]
};