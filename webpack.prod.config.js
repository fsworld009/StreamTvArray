var path = require('path');
var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin'); 

var config = {
    entry: {
        index: [path.resolve(__dirname, 'source/index.js')]
    },
    output: {
        path: path.resolve(__dirname, 'dist/bundle/'),
        publicPath: "./bundle/",
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
        }
    },
    module: {
        loaders: [
            {
                test: /\.(js)$/,
                loader: 'babel-loader',
                exclude: /(semantic.js)|(node_modules)/,
                query: {
                //   presets: ['babel-preset-env']
                    presets: [
                        ["env", {
                            "targets": {
                                "browsers": ["ie >= 9"]
                            }
                        }]
                    ]
                }
            },
            {
                test: /\.(vue)$/,
                loader: 'vue-loader',
            },
            { test: /\.json$/, loader: "json-loader" },
            { test: /\.css$/, loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader"],
                publicPath: "./"
            }) },
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest
            { test: /\.woff(2)?(\?v=[0-9\.]+)?$/,   loader: "url-loader?prefix=font/&limit=5000" },
            { test: /\.(eot|ttf|svg)(\?v=[0-9\.]+)?$/,    loader: "url-loader?prefix=font/&limit=5000" }
        ]
    },
    plugins: [
        new CleanWebpackPlugin("dist"),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: '"production"'
            }
        }),
        new UglifyJSPlugin({
            test: /\.(js|vue)$/i,
            uglifyOptions: {emca: 5}
        }),
        new ExtractTextPlugin('[name].bundle.css'),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.bundle\.css$/g,
            // cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            // canPrint: true
        }),
        new HtmlWebpackPlugin({ 
            filename: '../index.html',
            template: './source/index.template.html'
        }),
        new CopyWebpackPlugin([
            // {from: "./source/README_master_branch.MD", to: "../README.MD",force: true },
            // {from: "./source/*.png", to: "../[name].[ext]",force: true },
            // {from: "./source/screenshots", to: "../screenshots",force: true, toType: "dir" },
        ], {
            // debug: "info"
        })
    ]
};
module.exports=config;
