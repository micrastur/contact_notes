let environment = process.env.NODE_ENV || 'dev';

module.exports = {
    entry: './assets/js/app',
    output: {
        filename: './source/js/script.js'
    },
    watch: environment === 'dev',
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: "babel-loader",
            exclude: /(node_modules|bower_components)/,
            query: {
                presets: ['es2015', 'react', 'stage-0', 'stage-1']
            }
        }]
    },
};