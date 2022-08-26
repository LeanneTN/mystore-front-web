const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        'index' : './src/page/index/index.js',
        'user-login' : './src/page/user-login/index.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                // every file suffix by css will use style-loader and css-loader
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({filename: 'css/[name].css'}),
        new HtmlWebpackPlugin({
            template : './src/view/index.html',  //where the html pages storing
            filename : 'view/index.html',        //where to put the packed pages
            inject : true,                       //css and js will be injected into pages
            hash : true,                         //generate a hash code
            chunks : ['util', 'index']           //inject util into index
        })
    ],
    optimization : {
        //get public module
        splitChunks:{
            cacheGroups : {
                commons : {
                    name : 'util', //chunk's name
                    chunks : 'all',
                    minChunks : 2, //if a package is invoked twice or more, it will be managed by util
                    minSize : 0
                }
            }
        }
    },
    mode : 'development'
};