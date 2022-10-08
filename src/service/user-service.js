let _common_util = require('utils/util.js')

let _user_service = {

    //logout
    logout : function(resolve, reject){
        _common_util.request({
            url : _common_util.getServerURL('/user/logout'),
            method : 'GET',
            success : resolve,
            error : reject
        })
    },
    // get detail of user
    getUserDetail : function(resolve, reject){
        _common_util.request({
            url : _common_util.getServerURL('/user/get_user_detail'),
            method : 'POST',
            success : resolve,
            error : reject
        })
    },
    login : function(userInfo, resolve,reject){
        _common_util.request({
            url : _common_util.getServerURL('/user/login'),
            method : 'POST',
            data   : userInfo, 
            success : resolve,
            error : reject
        });
    },
    checkUsername : function(username, resolve, reject){
        _common_util.request({
            url : _common_util.getServerURL('/user/check_field'),
            method : 'POST',
            data   : {fieldName : 'username', fieldValue : username}, 
            success : resolve,
            error : reject
        })
    },
    checkEmail : function(email, resolve, reject){
        _common_util.request({
            url : _common_util.getServerURL('/user/check_field'),
            method : 'POST',
            data   : {fieldName : 'email', fieldValue : email}, 
            success : resolve,
            error : reject
        })
    },
    checkPhone : function(phone, resolve, reject){
        _common_util.request({
            url : _common_util.getServerURL('/user/check_field'),
            method : 'POST',
            data   : {fieldName : 'phone', fieldValue : phone}, 
            success : resolve,
            error : reject
        })
    },
    register : function(userInfo, resolve, reject){
        _common_util.request({
            url : _common_util.getServerURL('/user/register'),
            method : 'POST',
            contentType : 'application/json',
            data   : userInfo, 
            success : resolve,
            error : reject
        })
    }
}

module.exports = _user_service