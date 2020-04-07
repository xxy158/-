/**
 *
 * @type {XUtils}
 */
var XUtils = (function(){
    function XUtils(){
    }
    var _proto = XUtils.prototype;

    // 获取url参数
    _proto.getQueryString= function(name) {
        var url = location.href;
        var str = url.slice(0,url.indexOf('?'));
        str = str.split('/')[str.split('/').length-1].split('.')[0]
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            if (decodeURI(r[2]).indexOf('QUAKOOOBJECT')==0) {
                var str = decodeURI(r[2]).substr(12)
                return JSON.parse(str)
            } else {
                return decodeURI(r[2]);
            }
        }
        return null;
    }
    return XUtils;
})();

var AjaxData = (function(){
    function AjaxData(){
    }
    var _proto = AjaxData.prototype;

    _proto.ajaxGetData = function (url, reqData,callBack){
        if(!reqData){
            reqData={}
        }
        $.ajax({
            url: url,
            type: "get",
            async: true,
            data: reqData,
            dataType: 'json',
            success: function (ret) {
                var data = ret;
                if (!ret.success) {
                    layer.msg('请求失败')
                } else {
                    if(callBack){
                        callBack(data);
                    }
                }
            },
            error: function (err) {
                layer.msg(err.msg || '当前网络不给力')
            }
        })
    }
    // 获取url参数
    _proto.ajaxPostData = function (url, reqData,callBack){
        if(!reqData){
            reqData={}
        }
        $.ajax({
            url: url,
            type: "post",
            async: true,
            data: reqData,
            dataType: 'json',
            success: function (ret) {
                var data = ret;
                if (!ret.success) {
                    layer.msg('请求失败')
                } else {
                    if(callBack){
                        // layer.msg(ret.code)
                        callBack(data);
                    }
                }
            },
            error: function (err) {
                layer.msg(err.msg || '当前网络不给力')
            }
        })
    }
    return AjaxData;
})();

var xUtils = new XUtils();
var ajaxData = new AjaxData();
