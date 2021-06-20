let user=document.getElementById("isUsername");
let pass=document.getElementById("isPassword");
let sure=document.getElementById("isSure");
let email=document.getElementById("isEmail");
let jump=document.getElementById("isAccount");
let regex = "^(?!([a-zA-Z]+|\\d+)$)[a-zA-Z\\d]{6,20}$"; //判断是否同时含字母和数字


function isJump(){
    if(user.value===""||pass.value===""||sure.value===""||email.value===""){ //有为空的
        alert("不能有信息为空！");
    }
    else{
        if(pass.value!==sure.value){ //前后密码不一致
            alert("前后两次密码不一致！");
        }
        else{
            if(pass.value.match(regex)){ //密码格式正确
                alert("注册成功！欢迎"+user.value);
                window.location.href='lab2_3.html';
            }
            else{
                alert("密码应同时包含数字和字母!");
            }
        }
    }
}
