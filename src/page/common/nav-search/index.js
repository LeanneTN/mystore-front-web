require('./index.css')

let _common_util = require('utils/util.js')

let nav_search = {
    init : function(){
        this.bindEvents();
        this.loadKeyword();
        return this;  // so that init itself can be invoked
    },
    bindEvents : function(){
        let _this = this
        // click to submit
        $('#search-button').click(function(){
            _this.searchsubmit()
        });
        // type enter to submit
        $('#search-input').keyup(function(e){
            if(e.keyCode===13)
                _this.searchsubmit()
        })
    },
    loadKeyword : function(){

    },
    searchsubmit : function(){
        let keyword = $.trim($('#search-input').val())
        if(keyword){
            window.location.href = './product-list.html?keyword='+keyword
        }
        else{
            window.location.href = './index.html'
        }
    }
};

module.exports = nav_search.init()  // chain invoke