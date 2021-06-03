<?php

include "./config.php";

//找到最新的三个
$sql = 'select * from artworks order by timeReleased limit 3';

$query= mysqli_query($con,$sql);  // 执行sql语句，在$con对应的数据库中查找$sql中对应的东西


$arr = array();
$i=0;

//形成关联数组
while ($row=mysqli_fetch_assoc($query)){
    // 将结果存到数组中
    $arr[$i] = $row;
    $i++;
}

echo json_encode($arr);  // 使用json格式发送给前端js