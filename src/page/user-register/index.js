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

        $('#username').blur(function(){
            let username = $.trim($('#username').val())
            if(username){
                _user_service.checkUsername(username, function(res){
                    errorItem.hide();
                },
                function(errorMsg){
                    errorItem.show(errorMsg);
                })
            }
        });

        $('#email').blur(function(){
            let email = $.trim($('#email').val())
            if(email){
                _user_service.checkEmail(email, function(res){
                    errorItem.hide();
                },
                function(errorMsg){
                    errorItem.show(errorMsg);
                })
            }
        });

        $('#phone').blur(function(){
            let phone = $.trim($('#phone').val())
            if(phone){
                _user_service.checkPhone(phone, function(res){
                    errorItem.hide();
                },
                function(errorMsg){
                    errorItem.show(errorMsg);
                })
            }
        });

        $('#submit').click(function(){
            _this.submit()
        })
    },
    submit : function(){
        let formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val()),
            repeatPassword : $.trim($('#repeatPassword').val()),
            phone : $.trim($('#phone').val()),
            email : $.trim($('#email').val()),
            question : $.trim($('#question').val()),
            answer : $.trim($('#answer').val())
        }

        let validateResult = this.formDataValidate(formData);
        if(validateResult.status){
            delete formData.repeatPassword;
            JSON.stringify(formData); //change js object to json string 
            _user_service.register(formData, function(res){
                window.location.href = './result.html?type=register'
            },
            function(errorMsg){
                errorItem.show(errorItem)
            })
        }else{
            errorItem.show(validateResult.msg);
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
        }
        if(!_common_util.validate(formData.password, 'require')){
            result.msg = "password can't be null"
            return result
        }
        if(formData.password.length < 8){
            result.msg = "password's length needs to longer than 8"
            return result
        }
        if(formData.password != formData.repeatPassword){
            result.msg = "passwords can't match"
            return result
        }
        if(!_common_util.validate(formData.phone, 'phone')){
            result.msg = "format of phone number is not correct"
            return result
        }
        if(!_common_util.validate(formData.email, 'email')){
            result.msg = "format of email is not correct"
            return result
        }
        if(!_common_util.validate(formData.question, 'require')){
            result.msg = "password recommand question can't be null"
            return result
        }
        if(!_common_util.validate(formData.answer, 'require')){
            result.msg = "result can't be null"
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