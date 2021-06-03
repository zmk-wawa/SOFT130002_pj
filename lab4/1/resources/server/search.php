<?php

include "./config.php";

$keywords = $_POST['keywords']; //获取关键词
$kind = $_POST['kind'];  // 作品
$sort_method = $_POST['sort_method']; // 时间

//$keywords = 'a';
//$kind = 'artist';
//$sort_method = 'timeReleased';

$sql = "select * from artworks where $kind like '%$keywords%' order by '$sort_method'"; //查询包含$keywords数据

$result = mysqli_query($con,$sql);

if(!$result){
    die('无数据：'.mysqli_error($con));
}

$arr = array(); //空数组
$i=0;

//形成关联数组
while ($row=mysqli_fetch_assoc($result)){
    // 将结果存到数组中
    $arr[$i] = $row;
    $i++;
}

 echo json_encode($arr);  // 使用json格式发送给前端js

