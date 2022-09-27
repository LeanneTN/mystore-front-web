require('./index.css')
require('../common/index.js');
//require('page/common/nav-top-simple/index.js')
require('page/common/nav-top/index.js')
require('page/common/nav-search/index.js')
let _common_util = require('utils/util.js')

_common_util.request({
    url : 'http://localhost:8099/product/detail?productId=1',
    success : function(res){
        console.log(res)
    },
    error : function(err){
        console.log(err)
    }
})