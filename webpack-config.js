/**
 * Created by chaiqing on 2017/7/26.
 */
let webpack = require('webpack');
var path = require('path');
var StatsPlugin = require('stats-webpack-plugin');
module.exports = function (options) {

    let loaders = {
        'jsx': options.hotComponents ? ['react-hot-loader', 'babel-loader?stage=0'] : 'babel-loader?stage=0',
        'js': {
            loader: 'babel-loader?stage=0',
            include: [
                path.join(__dirname, 'app'),
                fs.realpathSync(path.join(__dirname, 'node_modules/fengui'))
            ]
        },
        'json': 'json-loader',
        'coffee': 'coffee-redux-loader',
        'json5': 'json5-loader',
        'txt': 'raw-loader',
        'png|jpg|jpeg|gif|svg': 'url-loader?limit=10',
        'woff|woff2': 'url-loader?limit=100000',
        'ttf|eot': 'file-loader',
        'wav|mp3': 'file-loader',
        'html': 'html-loader',
        'md|markdown': ['html-loader', 'markdown-loader']
    }

    var plugins = [
        new webpack.PrefetchPlugin('react'),
        new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment')
    ]

    if (options.minimize) {
        plugins.push(
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack.NoErrorsPlugin()
        )
    }

    plugins.push(new StatsPlugin(path.join(buildPath, 'stats.json'), {
        chunkModules: true,
        exclude: excludeFromStats
    }))

    let webpackConfig = {
        entry: {},
        output: {},
        module: {
            loaders: [loaders]
        },
        devServer: {},
        debug: options.debug,
        plugins: {},
    }

    return webpackConfig;
};