<?php

/*
 数据库配置文件
*/
// $con=mysqli_connect("IP地址，本机的话localhost也可以","数据库账号","数据库密码","数据库名称");

$con=mysqli_connect("localhost","root","","lab4_sql");
$con->query("set names utf8");
// 检查连接
if (!$con)
{
    die("连接错误: " . mysqli_connect_error());
}

?>