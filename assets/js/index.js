$(function(){
    let layer = layui.layer

    //调用获取用户信息函数
getUserInfo()

//退出登录
$('#btnLogout').on('click',function(){
    layer.confirm('是否退出登录', {icon: 3, title:'提示'}, 
    function(index){
        //do something
        localStorage.removeItem('token')
        location.href = '/login.html'

        layer.close(index);
      });
})
})





//获取用户信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){
            if(res.status !== 0) return layui.layer.msg('获取用户信息失败')
          //调用渲染用户头像函数
          renderAvatar(res.data)
        },
        //验证用户是否登录，未登录则清空token
        // complete:function(res){
        //     // console.log(res);
        //     if(res.responseJSON.status === 1 && res.responseJSON.message ==='身份认证失败！'){
        //         //强制清除token并且返回登录页面
        //         localStorage.removeItem('token')
        // location.href = '/login.html'

        //     }
        // }
    
    })
}

//渲染用户信息头像函数
function renderAvatar(user){
    //获取用户名，如果用户有昵称则优先输出昵称
    let name = user.nickname || user.username
    $('.welcome').html(name).show()
    //渲染用户头像
    if (user.user_pic !== null) {
        //如果用户有头像，则渲染头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //用户没设置头像，则渲染第一个字符
        $('.layui-nav-img').hide()
        //取字符串中的第一个字母并大写
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first)
    }
}
