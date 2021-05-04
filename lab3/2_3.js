let x=document.getElementById("userName");
let y=document.getElementById("passWord");
let z=document.getElementById("both");
let user=document.getElementById("isusername");
let pass=document.getElementById("ispassword");


//点击获取按钮之后调用的函数
function getcookie() {
    console.log(getCookie("userName"));
    console.log(getCookie("password"))
}

function isEmpty(){
    if(user.value===""){
        if(pass.value===""){ //全空
            z.style.display="block";
            x.style.display="none";
            y.style.display="none";
        }
        else{ //用户名空
            x.style.display="block";
            z.style.display="none";
            y.style.display="none";
        }
    }
    else{
        if(pass.value==""){//密码空
            y.style.display="block";
            z.style.display="none";
            x.style.display="none";
        }
        else{ //不空
            window.alert("欢迎"+user.value+"!");
            window.location.href='lab2_1.html';
        }
    }
}
