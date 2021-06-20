<?php
header("Content-type:text/html; charset=utf-8");

// 制定允许其他域名访问
header("Access-Control-Allow-Origin:*");
// 响应类型
header('Access-Control-Allow-Methods:POST');
// 响应头设置
header('Access-Control-Allow-Headers:x-requested-with, content-type');

include 'config.php';

session_start();
$name=$_POST['isusername'];
$pwd=$_POST['ispassword'];//获取表单提交的内容用两个变量来存post方式接受的值
$sql="select * from users where name='$name' and password='$pwd'";//查询语  句
$query=mysqli_query($con,$sql);//函数执行一条 MySQL 查询。
@$arr=mysqli_fetch_array($query);//然后从$query中取一行数字数组

if(is_array($arr)){//对$arr进行判断
    // 设置 SESSION
    $_SESSION['name'] = $name;
    echo json_encode(["msg" => $name,"res" => $arr]);
}else{
    echo json_encode(["msg" => 'no']);
}

$con->close();   


?>