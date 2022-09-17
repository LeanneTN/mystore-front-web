//use es5
// self-defined common objects needs to start with _
var _common_util = {
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
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    }
}

module.exports = _common_util