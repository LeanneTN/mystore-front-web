require('./index.css')

let _common_util = require('utils/util.js')
let _user_service = require('service/user-service.js')
let _cart_service = require('service/cart-service.js')

let nav_top = {
    init : function(){
        this.bindEvents();
        this.loadUserInfo();
        this.loadCartCount();
        return this;  // so that init itself can be invoked
    },
    bindEvents : function(){
        $('.js-login').click(function(){
            _common_util.toLogin();
        })
        $('.js-register').click(function(){
            window.location.href = './user-register.html'
        })
        $('.js-logout').click(function(){
            _user_service.logout(
                function(){
                    //success (resolve)
                    window.location.reload();
                },
                function(errorMsg){
                    //error (reject)
                    _common_util.errorTips(errorMsg)
                }
            )
        })
    },
    loadUserInfo : function(){
        _user_service.getUserDetail(
            function(res){
                // hide sign in and show welcome message and put the username we get from back end in the page
                $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username)
            },
            function(errorMsg){
                // no need to handle
            }
        )
    },
    loadCartCount : function(){
        _cart_service.getCartCount({
            function(res){
                $('.cart-count').text(res || 0)
            },
            function(errorMsg){
                $('.cart-count').text(0)
            }
        })
    }
};

module.exports = nav_top.init()  // chain invoke