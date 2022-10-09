const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");

let getHtmlPluginConfig = function(name){
    return {
        
        template : './src/view/' + name + '.html',  //where the html pages storing
        filename : 'view/'+ name +'.html',        //where to put the packed pages
        inject : true,                       //css and js will be injected into pages
        hash : true,                         //generate a hash code
        chunks : ['common', name]           //inject util into index
        
    }
}

module.exports = {
    entry: {
        'index' : './src/page/index/index.js',
        'user-login' : './src/page/user-login/index.js',
        'user-register' : './src/page/user-register/index.js',
        'result' : './src/page/result/index.js',
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
        new HtmlWebpackPlugin(getHtmlPluginConfig('index')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('user-login')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('user-register')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('result')),
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