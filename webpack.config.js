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
        assetModuleFilename : 'resources/[name][ext][query]'
    },
    module: {
        rules: [
            {
                // every file suffix by css will use style-loader and css-loader
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(htm|string)$/i,
                use: {
                    loader : 'html-loader',
                    options: {
                        esModule : false
                    }
                },
            },
            {
                test : /\.(woff|woff2|eot|ttf|otf)$/i,
                type : 'asset/resource',
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
    resolve:{
        alias : {
            node_modules : path.resolve(__dirname, '/node_modules'),
            page : path.resolve(__dirname, './src/page'),
            utils : path.resolve(__dirname, './src/utils'),
            view : path.resolve(__dirname, './src/view'),
            service : path.resolve(__dirname, './src/service')
        }
    }
    ,
    devServer: {
        static : './dist'
    },
    mode : 'development'
};