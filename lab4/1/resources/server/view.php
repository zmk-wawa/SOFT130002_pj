<?php
include "./config.php";  // 引入数据库配置文件
$id = $_POST['id'];
$view = $_POST['view'];

$sql = "update artworks set view='$view' where artworkID='$id'";

$query= mysqli_query($con,$sql);  // 执行sql语句，在$con对应的数据库中查找$sql中对应的东西

echo $query;


?>
