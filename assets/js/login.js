$(function(){
    //点击去注册按钮
   $('#link_reg').on('click',function(){
    $('.login-box').hide()
    $('.reg-box').show()
   })
   //点击去登录按钮
   $('#link_login').on('click',function(){
    $('.login-box').show()
    $('.reg-box').hide()
   })

   //通过layui中获取layui对象
   let form = layui.form
   let layer = layui.layer
   //通过form.verify（）自定义函数检验规则
   form.verify({
    //自定义一个pwd检验规则
  
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //验证两次密码是否一致
    repwd:function(value){
        //先获取第一次输入密码的值
        let pwd = $('.reg-box [name=password]').val()
        if(pwd !== value){
            return '两次密码不一致'
        }

    }
   })
   //注册功能验证
   
   $('#form_reg').on('submit',function(e){
    e.preventDefault()
  
    $.post('/api/reguser',{username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},
    function(res){
     
        if(res.status !== 0){
        //    return console.log(res.message);
        return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录')
        $('#link_login').click()
    })
   })
   //登录功能
   $('#form_login').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        method:'POST',
        url:'/api/login',
        data:$(this).serialize(),
        success:function(res){
            
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('登录成功')
            //将服务器返回的token保存到localStrong中
            localStorage.setItem('token',res.token)
            location.href = '/index.html'

        }
    })
   })
})