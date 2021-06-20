<?php
/*
 查询数据库热度前三的数据
 没有接前端参数（不需要参数）
*/

include "./config.php";  // 引入数据库配置文件

//select 字段列表/* from 表名 where 条件 order by 字段名1 asc/desc, 字段名2 asc/desc,…
$sql = 'select * from artworks order by view desc limit 3';  // sql语句,desc降序

$query= mysqli_query($con,$sql);  // 执行sql语句，在$con对应的数据库中查找$sql中对应的东西

$arr = array(); //空数组
$i=0;

//形成关联数组
while ($row=mysqli_fetch_assoc($query)){
	// 将结果存到数组中
	$arr[$i] = $row;
	$i++;
}

echo json_encode($arr);  // 使用json格式发送给前端js
