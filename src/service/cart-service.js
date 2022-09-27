let _common_util = require('utils/util.js')

let _cart_service = {

    // get quantities of cart
    getCartCount : function(resolve, reject){
        _common_util.request({
            url : _common_util.getServerURL('/cart/get_cart'),  //url of get cart
            method : 'POST',
            success : resolve,
            error : reject
        })
    }
}

module.exports = _cart_service