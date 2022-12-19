$(function(){
    
    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return '昵称长度必须在1-6个字符之间！'
            }
        }
    })
//初始化用户基本信息方法调用
initUserInfo()
    //重置表单
    $('#btnReset').on('click',function(e){
        //阻止表单默认内容全部清空
        e.preventDefault()
        initUserInfo()
    })

    //确认提交申请
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
            // 更新信息成功后刷新页面
            window.parent.getUserInfo()
            }
        })
    })
})
var form = layui.form
let layer = layui.layer
//初始化用户基本信息
function initUserInfo(){
   
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status !== 0){
                return layer.msg('获取用户信息失败')
            }
            //调用form.val（）快速为表单赋值
            form.val('formUserInfo',res.data)
        }
    })
}