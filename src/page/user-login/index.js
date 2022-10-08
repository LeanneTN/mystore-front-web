require('./index.css')
require('page/common/nav-top-simple/index.js')
require('../common/index.js')
let _common_util = require('utils/util.js')
let _user_service = require('service/user-service.js')

let errorItem = {
    show : function(msg){
        $('.user-form-error').show().find('.error-message').text(msg);
    },
    hide : function(){
        $('.user-form-error').hide().find('.error-message').text('');
    }
}

let user_login = {
    init : function(){
        this.bindEvents();
    },
    bindEvents : function(){
        let _this = this
        $('#submit').click(function(){
            _this.submit()
        })
        $(".user-form-item").keyup(function(e){
            if(e.keyCode == 13){
                _this.submit();
            }
        })
    },
    submit : function(){
        let formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        }

        let validateResult = this.formDataValidate(formData);
        if(validateResult.status){
            _user_service.login(formData, function(res){
                window.location.href = _common_util.getURLParam('redirect') || './index.html';
            },
            function(errorMsg){
                errorItem.show(errorMsg)
            })
        }else{
            //console.log('validate failed')
            errorItem.show(validateResult.msg)
        }
    },
    formDataValidate : function(formData){
        let result = {
            status : false,
            msg : ''
        }
        //validate
        if(!_common_util.validate(formData.username, 'require')){
            result.msg = "username can't be null"
            return result
        }else if(!_common_util.validate(formData.password, 'require')){
            result.msg = "password can't be null"
            return result
        }
        result.status = true
        result.msg = 'pass validate'

        return result
    }
    
};

$(function(){
    user_login.init();
})