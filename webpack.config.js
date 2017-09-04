"use strict";

let environment = process.env.NODE_ENV || 'dev',
    extractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path');

process.noDeprecation = true;

module.exports = {
    context: __dirname + '/assets/',
    entry: './js/app',
    output: {
        path: __dirname + '/source/',
        publicPath: '/source/',
        filename: 'js/[name].js',
        library: '[name]'
    },
    watch: environment === 'dev',
    devtool: environment === 'dev' ? 'source-map' : '',
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
                loader: extractTextPlugin.extract({use: 'css-loader?resolve url' })
            },
            {
                test: /\.(jpg|jpeg|gif|png|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                include: path.resolve(__dirname, 'node_modules'),
                loader: 'file-loader?name=[1]&regExp=node_modules(.*)'
            },
            {
                test: /\.(jpg|jpeg|gif|png|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'file-loader?name=[path][name].[ext]'
            }
        ]
    },
    plugins: [
        new extractTextPlugin('/css/[name].css')
    ]
};
