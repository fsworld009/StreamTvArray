var path = require('path');
var webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");

var config = {
    entry: {
        index: [path.resolve(__dirname, 'source/index.js')]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
        }
    },
    output: {
        //path and public Path is meaningless when used by expressjs
        path: path.resolve(__dirname, 'bundle/'),
        publicPath: "/bundle/",
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    module: {
        loaders: [
            {
              test: /\.js$/,
              loader: 'webpack-module-hot-accept',
              exclude: /(semantic.js)|(node_modules)/,
            },
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
                /*
                options: {
          loaders: {
            {{#sass}}
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
            {{/sass}}}
                 */
            },
            { test: /\.json$/, loader: "json-loader" },
            { test: /\.css$/, loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader"],
                publicPath: "./"
            }) },
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest
            { test: /\.woff(2)?(\?v=[0-9\.]+)?$/,   loader: "url-loader?prefix=font/&limit=5000" },
            { test: /\.(eot|ttf|svg)(\?v=[0-9\.]+)?$/,    loader: "url-loader?prefix=font/&limit=5000" },
            // { test: require.resolve("jquery"), loader: "expose?$!expose?jQuery" },
            // { test: require.resolve("lodash"), loader: "expose?_" },
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        //new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('[name].bundle.css'),
        // new webpack.LoaderOptionsPlugin({
        //     debug: true
        // }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new HtmlWebpackPlugin({ 
            filename: '../source/index.html',
            template: './source/index.template.html',
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin()
  ],
  devtool: "#source-map",
  devServer: {
      contentBase: './source/',
      port: 3000,
    //   historyApiFallback: {
    //         index: '/',
    //         rewrites: [
    //           { from: /^\/config\/*/, to: '/config/'}
    //       ]
    //   }
  }

};
module.exports=config;
