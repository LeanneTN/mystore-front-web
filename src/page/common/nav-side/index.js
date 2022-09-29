require('./index.css')
let htmlTemplate = require('./index.string')

let _common_util = require('utils/util.js')

let nav_side = {

    option : {
        name : '',
        navSideList : [
            {name : 'user-center', description: 'personal center', href:'./user-center.html'},
            {name : 'modify-password', description: 'modify password', href:'./user-password.html'},
            {name : 'order-list', description: 'order list', href:'./order-list.html'},
            {name : 'about', description: 'about mystore', href:'./about.html'}
        ]
    },

    init : function(option){
        // concat option set above with option which is set when invoke init function
        $.extend(this.option, option)
        this.renderNavSide();
    },
    renderNavSide : function(){
        for(const element of this.option.navSideList){
            if(element.name === this.option.name){
                element.isActive = true;
            }
        }
        let result = _common_util.renderHTML(htmlTemplate, {navSideList: this.option.navSideList})
        $('.nav-side').html(result)
    }
};

module.exports = nav_side