const path = require('path');

module.exports = {
    entry: {
        'index' : './src/page/index/index.js',
        'user-login' : './src/page/user-login/index.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
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