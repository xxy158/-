var html=`<!-- 底部 -->
<div class="footer">
    <div class="footer_bottom">
        <div class="yubu">
            <p class="yubu_title">
                <span class="yubuhead">兴游网-旅游推荐系统</span>
            </p>
            <p class="yubu_intro">兴游网-旅游推荐系统是一款以用户提交个人各方面要求（交通环境、饮食文化、兴趣爱好等）而得到适宜的旅游推荐为主旨的旅游推荐系统。该系统不仅是系统可以向用户推荐意向景点，用户也可以向系统推荐系统中没有的旅游景点</p>
            <div class="wrokingdetails">
                <p class="yubu_phone">
                    <span class="iconfont icon-Incoming_call imgs"></span>
                    <span class="phone_detail">联系方式：15828862942</span>
                </p>
                <p class="yubu_address">
                    <span class="iconfont icon-icon-test imgs"></span>
                    <span class="phone_detail">邮箱地址：xxy1426143500@163.com</span>
                </p>
                <p class="yubu_worktime">
                    <span class="iconfont icon-shijian imgs"></span>
                    <span class="phone_detail">办公时间：工作日 09:30-17:00 休息日 14:00-17:00</span>
                </p>
            </div>
        </div>
        <div class="lineurl">
            <p class="friendurl">友情链接</p>
            <ul class="urleach clearfix">
                <li><a href="https://www.yunos.com/">YunOS</a></li>
                <li><a href="http://www.zongheng.com/">小说网</a></li>
                <li><a href="https://www.ly.com/">同城旅游</a></li>
                <li><a href="https://www.baidu.com/">百度一下</a></li>
                <li><a href="https://www.sogou.com/">搜狗搜索</a></li>
                <li><a href="https://cn.bing.com/">微软Bing</a></li>
                <li><a href="http://www.yue365.com/">365音乐网</a></li>
                <li><a href="https://www.mapbar.com/">图吧</a></li>
                <li><a href="http://www.google.cn/">谷歌搜索</a></li>
                <li><a href="http://www.lvye.cn/">绿野户外</a></li>
                <li><a href="https://qpay.qq.com/">QQ钱包</a></li>
                <li><a href="https://www.tripadvisor.cn/">TripAdvisor</a></li>
                <li><a href="http://www.8264.com/">户外运动</a></li>
                <li><a href="https://www.mapbar.com/">地图查找</a></li>
                <li><a href="http://lvyou.baidu.com/">百度旅游</a></li>
                <li><a href="https://www.cncn.com/">欣欣旅游网</a></li>
            </ul>     
            <div class="erweima">
                <img src="./image/erweima.png" alt="">
                <p class="erwei_down">联系我们</p>
            </div>
        </div>
    </div>
</div>
<!-- 侧边栏 -->
<div class="evelator">
    <div class="first">
        <a href="./customized.html">专属<br>推荐</a>
    </div>
    <div>
        <a href="javascript:void(0)" class="hoverdisp">
            <span class="iconfont icon-search"></span>
            <div class="introduce" id="tosearch">点击搜索</div>
        </a>
    </div>
    <div>
        <a href="javascript:void(0)" class="hoverdisp">
            <span class="iconfont icon-prompt"></span>
            <div class="introduce" onclick="toAdvice()">留言反馈</div>
        </a>
    </div>
    <div>
        <a href="javascript:void(0)" class="hoverdisp">
            <span class="iconfont icon-scanQR"></span>
            <div class="introduce last">
                <p class="oursImg">
                    <img src="./image/erweima.png" alt="">
                </p>
                <p class="ours">我们的微信</p>
            </div>
        </a>
    </div>
    <span class="backTop" href="javascript:void(0);"><img src="./image/topTop.png" alt=""></span>
</div>`
var html1=`<div class="header">
<div class="content">
    <div class="mainleft">
        <span class="logo">您好，兴游网 欢迎您</span>
        <ul class="navlist">
            <li><a href="./main.html">首页</a></li>
            <li><a href="./recomment.html">热门推荐</a> </li>
            <li><a href="./message.html">旅游资讯</a> </li>
            <li><a href="./share.html">游记分享</a> </li>
            <li><a href="./customized.html">专属推荐</a> </li>
            <li><a href="./aboutUs.html">关于我们</a> </li>
        </ul>
    </div>
    <div class="login_register">
        <div class="searchdetails">
            <input type="text" class="search" placeholder="请输入景区关键字" id="cansearch">
            <img src="./image/search.png" alt="" id="dosearch">
        </div>
        <div class="allregister">
            <span class="login">登录</span>
            <span class="register" onclick="window.open('./register.html')">注册</span>
        </div>
        <div class="has_login">
            <img src="./image/header.jpg" alt="" onerror="this.src='./image/header.jpg'">
            <div class="xiala">
                <!-- 消息下拉 -->
                <ul class="listxiala">
                    <li><a href="./mine.html">修改个人信息</a></li>
                    <li><a href="./aboutUs.html?which=1">留言反馈</a></li>
                    <li><a href="#" onclick="exitlogin()">退出登录</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
</div>`
$("body").prepend(html1)
$("body").append(html)
var users;
icon()
function icon(){
    if(sessionStorage.getItem("users")){
        users = JSON.parse(sessionStorage.getItem("users"))[0];
        if(users){
            $(".allregister").hide()  //登录注册隐藏
            $(".has_login").show()    //头像显示
            $(".has_login img").attr("src",users.icon)
        }
    }
}

$(".has_login").hover(
    function(){
        $(".xiala").slideDown(200)
    },function() {
        $(".xiala").slideUp(200)
    }
)
// 退出登录
function  exitlogin() {
    sessionStorage.clear();
    user=null
    layer.msg("退出登录成功")
    $(".allregister").show()  //登录注册隐藏
    $(".has_login").hide()    //头像显示
}

$(".hoverdisp").hover(
    function(){
        $(this).children(".introduce").addClass("show").animate({
            right: '1rem',
        },100)
    },function(){
        $(this).children(".introduce").removeClass("show").animate({
            right: '-3.2rem',
        },100)
})
$(".backTop").click(function(){
    $("html,body").animate({
        scrollTop: 0
    }, 200);
})
$(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
        $(".backTop").fadeIn(300);
    } else {
        $(".backTop").fadeOut(300);
    }
})
// 登录显示和隐藏
$(".login").click(function(){
    $(".loginback").show(200)
})
$(".close").click(function(){
    $(".loginback").hide(200)
})
// 密码可见和不可见
$(".hide").click(function(){
    if($(this).hasClass("show")){
        $(this).removeClass("show")
        $(this).prev().prop("type","password")
    }else{
        $(this).addClass("show")
        $(this).prev().prop("type","text")
    }
})
// 跳转留言反馈
function toAdvice(){
    window.open("./aboutUs.html?which=1");
}
// 聚焦搜索
$("#tosearch").click(function(){
    window.open('./recomment.html?onfocus='+true,'_self');
})

// 登录提交
function userlogin(){
    var loginParam={}
    loginParam.telphone=$("#phone").val();
    loginParam.password=$("#password").val();
    if(!loginParam.telphone){
        layer.msg("请输入手机号码")
        return
    }
    var mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if(!mobile.test(loginParam.telphone)){
        layer.msg("请输入正确的手机号码")
        return
    }
    if(!loginParam.password){
        layer.msg("请输入密码")
        return
    }
    $.ajax({
        url: 'product/login',
        type: 'post',
        data: loginParam,
        dataType: "json",
        success: function(result) {
            sessionStorage.clear();
            users=sessionStorage.setItem("users", JSON.stringify(result.data));
            if(result.success){
                layer.msg(result.msg)
                $(".loginback").hide()    //登录背景隐藏
                $(".allregister").hide()  //登录注册隐藏
                $(".has_login").show()    //头像显示
                $(".has_login img").attr("src",result.data[0].icon)
            }else{
                layer.msg(result.msg)
            }
        }
    });
}
// 头部的搜索
$("#dosearch").click(function(){
    var key=$("#cansearch").val();
    window.open("./recomment.html?keyword="+key,'_self');
})
$("#cansearch").keypress(function(e){
    var keycode = e.keyCode;
    if(keycode=='13') {
        e.preventDefault();
        $("#dosearch").click()
    }
})