(function ($, window, document, undefined) {
    //定义分页类
    function Paging(element, options) {
        this.element = element;
        _this = this;
        //传入形参
        this.urlParms = new Object();
        if (decodeURI(window.location.search).indexOf("?") !== -1) {
            decodeURI(window.location.search).substr(1).split("&").forEach(function (item) {
                _this.urlParms[item.split("=")[0]] = unescape(item.split("=")[1]);
            });
        }
        this.urlParms.pageNum = this.urlParms.pageNum ? unescape(this.urlParms.pageNum).replace(/[^0-9]/g, '') : 1;
        this.url = window.location.origin + window.location.pathname + '?';
        for (var key in this.urlParms) {
            if (key !== 'pageNum' && this.urlParms[key]) this.url += key + '=' + this.urlParms[key] + '&';
        }
        this.options = {
            pageNo: +this.urlParms.pageNum,
            totalPage: options.totalPage,
            totalSize: options.totalSize,
            callback: options.callback,
            url: this.url
        };
        //根据形参初始化分页html和css代码
        this.init();
    }
    
    //对Paging的实例对象添加公共的属性和方法
    Paging.prototype = {
        constructor: Paging,
        init: function () {
            this.creatHtml();
            this.bindEvent();
        },
        creatHtml: function () {
            var me = this;
            var content = "";
            var current = me.options.pageNo;
            var total = me.options.totalPage;
            var url = me.options.url;
            content += "<a id='firstPage' style='display:none;'>首页</a>";
            content += "<a class='quakooPrePage' class='" + (current === 1 ? 'active' : '') + "' href='" + url + "pageNum=" + (current <= 2 ? 1 : current - 1) + "'>&lt;</a>"
            //总页数大于6时候
            if (total > 6) {
                //当前页数小于5时显示省略号
                if (current < 5) {
                    for (var i = 1; i < 6; i++) {
                        if (current == i) {
                            content += "<a class='current' href='" + url + "pageNum=" + i + "'>" + i + "</a>";
                        } else {
                            content += "<a href='" + url + "pageNum=" + i + "'>" + i + "</a>";
                        }
                    }
                    content += "<span>···</span>";
                    content += "<a href='" + url + "pageNum=" + total + "'>" + total + "</a>";
                } else {
                    //判断页码在末尾的时候
                    if (current < total - 3) {
                        for (var i = current - 2; i < current + 3; i++) {
                            if (current == i) {
                                content += "<a class='current' href='" + url + "pageNum=" + i + "'>" + i + "</a>";
                            } else {
                                content += "<a href='" + url + "pageNum=" + i + "'>" + i + "</a>";
                            }
                        }
                        content += "<span>···</span>";
                        content += "<a href='" + url + "pageNum=" + total + "'>" + total + "</a>";
                        //页码在中间部分时候
                    } else {
                        content += "<a href='" + url + "pageNum=" + 1 + "'>1</a>";
                        content += "<span>···</span>";
                        for (var i = total - 4; i < total + 1; i++) {
                            if (current == i) {
                                content += "<a class='current' href='" + url + "pageNum=" + i + "'>" + i + "</a>";
                            } else {
                                content += "<a href='" + url + "pageNum=" + i + "'>" + i + "</a>";
                            }
                        }
                    }
                }
                //页面总数小于6的时候
            } else {
                for (var i = 1; i < total + 1; i++) {
                    if (current == i) {
                        content += "<a class='current' href='" + me.options.url + "pageNum=" + i + "'>" + i + "</a>";
                    } else {
                        content += "<a href='" + me.options.url + "pageNum=" + i + "'>" + i + "</a>";
                    }
                }
            }
            content += "<a class='quakooNextPage' class='" + (current === total ? 'active' : '') + "' href='" + url + "pageNum=" + (current >= total - 1 ? total : current + 1) + "'>&gt;</a>";
            content += "<a id='lastPage' style='display: none;'>尾页</a>";
            me.element.html(content);
        },
        //添加页面操作事件
        bindEvent: function () {
            var me = this;
            me.element.off('click', 'a');
            me.element.on('click', 'a', function () {
                var num = $(this).html();
                var id = $(this).attr("class");
                if (id == "quakooPrePage") {
                    if (me.options.pageNo == 1) {
                        me.options.pageNo = 1;
                    } else {
                        me.options.pageNo = +me.options.pageNo - 1;
                    }
                } else if (id == "quakooNextPage") {
                    if (me.options.pageNo == me.options.totalPage) {
                        me.options.pageNo = me.options.totalPage
                    } else {
                        me.options.pageNo = +me.options.pageNo + 1;
                    }
                    
                } else if (id == "firstPage") {
                    me.options.pageNo = 1;
                } else if (id == "lastPage") {
                    me.options.pageNo = me.options.totalPage;
                } else {
                    me.options.pageNo = +num;
                }
                me.creatHtml();
                if (me.options.callback) {
                    me.options.callback(me.options.pageNo);
                }
            });
        }
    };
    //通过jQuery对象初始化分页对象
    $.fn.paging = function (options) {
        return new Paging($(this), options);
    }
})(jQuery, window, document);

var quakooPcPagePlugin = (function(){
    function quakooPcPagePlugin(options,callbackFn){
        if(!quakooUtils.isObject(options)){
            quakooMsg.toast('分页参数不对')
            return ;
        }
        this.dom = options.el?options.el:'#quakooPageBtn';
        this.url = options.url;
        this.callbackFn = callbackFn;
        this.params = quakooUtils.deepCopy(options.params);
        this.totalSize = 0;      //数据
        this.pageSize = options.pageSize?options.pageSize:5;
        this.pageNum = 1;
        this.totalPage = Math.ceil(this.totalSize/this.pageSize);

        this.data = [];        //获得的数据
        this.getData();
    }
    var _proto = quakooPcPagePlugin.prototype;
    _proto.getData= function () {
        var _this = this;
        if(!this.url){
            return
        }
        this.params.page = this.pageNum;
        this.params.size = this.pageSize;
        quakooData.ajaxGetData(this.url,this.params,function (ret) {
            _this.totalSize = ret.total;
            _this.totalPage = Math.ceil(_this.totalSize/_this.pageSize);

            $(_this.dom).html(_this.creatHtml())
            _this.bindEvent()
            if(_this.callbackFn){
                _this.callbackFn(ret.rows);
            }
        })
    }
    _proto.creatHtml = function () {
        var me = this;
        var content = "";
        var current = parseInt(me.pageNum);
        var total = parseInt(me.totalPage);
        content += "<a class='quakooPrePage' class='" + (current === 1 ? 'active' : '') + "' href='javascript:;'>&lt;</a>"
        //总页数大于6时候
        if (total > 6) {
            //当前页数小于5时显示省略号
            if (current < 5) {
                for (var i = 1; i < 6; i++) {
                    if (current == i) {
                        content += "<a class='current' href='javascript:;'>" + i + "</a>";
                    } else {
                        content += "<a href='javascript:;'>" + i + "</a>";
                    }
                }
                content += "<span>···</span>";
                content += "<a href='javascript:;'>" + total + "</a>";
            } else {
                //判断页码在末尾的时候
                if (current < total - 3) {
                    for (var i = current - 2; i < current + 3; i++) {
                        if (current == i) {
                            content += "<a class='current' href='javascript:;'>" + i + "</a>";
                        } else {
                            content += "<a href='javascript:;'>" + i + "</a>";
                        }
                    }
                    content += "<span>···</span>";
                    content += "<a href='javascript:;'>" + total + "</a>";
                    //页码在中间部分时候
                } else {
                    content += "<a href='javascript:;'>1</a>";
                    content += "<span>···</span>";
                    for (var i = total - 4; i < total + 1; i++) {
                        if (current == i) {
                            content += "<a class='current' href='javascript:;'>" + i + "</a>";
                        } else {
                            content += "<a href='javascript:;'>" + i + "</a>";
                        }
                    }
                }
            }
            //页面总数小于6的时候
        } else {
            for (var i = 1; i < total + 1; i++) {
                if (current == i) {
                    content += "<a class='current' href='javascript:;'>" + i + "</a>";
                } else {
                    content += "<a href='javascript:;'>" + i + "</a>";
                }
            }
        }
        content += "<a class='quakooNextPage' class='" + (current === total ? 'active' : '') + "' href='javascript:;'>&gt;</a>";
        return content;
    },
    _proto.bindEvent = function(){
        var _this = this;
        $(this.dom).find('a').on('click', function (e) {
            if(e.target.className=='quakooPrePage'){
                _this.pageNum--;
                if(_this.pageNum<=1){
                    _this.pageNum = 1;
                }
                _this.getData();
            }else if(e.target.className=='quakooNextPage'){
                _this.pageNum++;
                if(_this.pageNum>=_this.totalPage){
                    _this.pageNum = _this.totalPage;
                }
                _this.getData();
            }else{
                if(quakooUtils.isNum(e.target.innerText)){
                    _this.pageNum = e.target.innerText;
                    _this.getData()
                }
            }
        })
    }
    return quakooPcPagePlugin;
})();
