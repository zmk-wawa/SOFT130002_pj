<?php
header("Content-type:text/html; charset=utf-8");
// 制定允许其他域名访问
header("Access-Control-Allow-Origin:*");
// 响应类型
header('Access-Control-Allow-Methods:POST');
// 响应头设置
header('Access-Control-Allow-Headers:x-requested-with, content-type');
include './config.php';

$name=trim($_POST['isUsername']);   // 账号
$password=$_POST['isPassword'];     // 密码
$isEmail=$_POST['isEmail'];         // 邮箱
$isTel=$_POST['isTel'];             // 手机号
$isAddress=$_POST['isAddress'];     // 地址

$sql = "select * from users where name='$name'";
$info = mysqli_query($con,$sql);
@$res = mysqli_num_rows($info);

if(empty($name)){
   echo json_encode(["msg" => 'no']);
}else if(empty($password)){
   echo json_encode(["msg" => 'no']);
}else{	
   if($res){
       echo json_encode(["msg" => '账号已存在']);
   }else{
       $sql1 ="insert into users(name,password,email,tel,address) values('".$name."','" .($password)."','".$isEmail."','".$isTel."','".$isAddress."')";
       $result = mysqli_query($con,$sql1);
       if($result){
            echo json_encode(["msg" => '注册成功']);
       }else{
            echo json_encode(["msg" => '注册失败']);
       }
   }

}	

$con->close();

                                        



?>