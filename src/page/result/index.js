require('./index.css')

let _common_util = require('utils/util.js')

let result = {
    init : function(){
        let type = _common_util.getURLParam('type');
    }
}

$(function(){
    result.init();
})

/**
 * to make the js we write running automatically on the page by jQuery needs to use
 * $(function(){})
 * this is how we invoke the js code when the page is intializing with jQuery
 */