require('./index.css')
require('../common/index.js');
//require('page/common/nav-top-simple/index.js')
require('page/common/nav-top/index.js')
require('page/common/nav-search/index.js')
let navSide = require('page/common/nav-side/index.js')
let _common_util = require('utils/util.js')
let Hogan = require('hogan.js')

_common_util.request({
    url : 'http://localhost:8099/product/detail?productId=1',
    success : function(res){
        console.log(res)
    },
    error : function(err){
        console.log(err)
    }
})

navSide.init({name:'order-list'});

