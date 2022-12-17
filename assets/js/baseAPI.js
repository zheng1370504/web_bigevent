$.ajaxPrefilter(function (options) {
    //统一设置url前缀
    options.url = 'http://www.liulongbin.top:3007' + options.url
    //统一设置需要权限的headers中的token
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        // console.log(res);
        //验证用户是否登录，未登录则清空token
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清除token并且返回登录页面
            localStorage.removeItem('token')
            location.href = '/login.html'

        }
    }

})