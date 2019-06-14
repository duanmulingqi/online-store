$(()=>{
    var $form=$("form");
    $("#btn").click(()=>{
        $.post("data/users/login.php",$form.serialize())
            .then(text=>{
                if(text=="false"){
                    $form[0].reset();
                    alert("用户名或密码不正确")
                }else{
                    alert("登陆成功");
                    if(location.search!==""){
                        //获取原来的url地址
                        var back=location.search.slice(6);
                        location=back;
                    }else{
                        location="index.html";
                    }
                }
            })
    })
    //给登录绑定回车事件，模拟触发
    $(window).keyup(e=>{
        if(e.keyCode==13) $("#btn").click();
    })
})