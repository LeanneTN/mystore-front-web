//use es5

let config = {
    serverHost : 'http://localhost:8099'
}

// self-defined common objects needs to start with _
let _common_util = {
    request : function(param){
        var _this = this;
        $.ajax({
            type : param.method || 'GET',
            url : param.url || '',
            dataType : param.type || 'json',
            data : param.data || '',
            success : function(res){
                //request success and return code is 0
                if (0 === res.code){
                    typeof param.success === 'function' && param.success(res.data, res.message)
                }
                // request success and return code is 1, means error
                else if (1 === res.code){
                    typeof param.error === 'function' && param.error(res.message)
                }
                // parameter wrong
                else if(10 === res.code){
                    typeof param.error === 'function' && param.error(res.message)
                }
                // request success but need to login
                else if(11 === res.code){
                    _this.toLogin();
                }
            },
            error : function(){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    toLogin : function(){
        // jump to the login page
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    // why use a method to invoke path instead of export it from common util directly?
    // maybe this path will be encoded in the future in order to hide it, the part of encode can be written in this method(modularization)
    getServerURL : function(path){
        return config.serverHost + path;
    },
    errorTips : function(msg){
        alert(msg || 'error occurs')
    },
    getURLParam : function(name){
        let paramString = window.location.search.substring(1);
        let regExp = new RegExp('(^|&)' + name + '(=[^&]*)(&|$)'); // begin with space or & plus
        let result = paramString.match(regExp);
        return result ? decodeURIComponent(result[2]) : null
    }
}

module.exports = _common_util