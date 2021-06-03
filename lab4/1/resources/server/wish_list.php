<?php

include "./config.php";  // 引入数据库配置文件

$userID = $_POST['userID'];  // 接收ajax传来的参数
// $id = 425;

$sql = "select a.* from carts c, artworks a where c.artworkID = a.artworkID AND c.userID = '$userID'";  // 多表查询sql语句



$query= mysqli_query($con,$sql);  // 执行sql语句

$arr = array();
$i=0;
while ($row=mysqli_fetch_assoc($query)){
    // 将结果存到数组中
    $arr[$i] = $row;
    $i++;
}

echo json_encode($arr);  // 使用json格式发送给前端js