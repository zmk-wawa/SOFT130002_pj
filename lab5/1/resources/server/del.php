<?php
/*
 查询数据库热度前三的数据
 没有接前端参数（不需要参数）
*/

include "./config.php";  // 引入数据库配置文件

$userID = $_POST['userID'];
$artworkID = $_POST['artworkID'];

$sql1 = "select * from carts where userID='$userID' and artworkID='$artworkID'";
$res = mysqli_query($con,$sql1);
@$res1 = mysqli_num_rows($res);
if($res1){
    $sql = "delete from carts where userID='$userID' and artworkID='$artworkID'";
    $query= mysqli_query($con,$sql);  // 执行sql语句，在$con对应的数据库中查找$sql中对应的东西
    echo json_encode(['msg' => '删除成功']);  // 使用json格式发送给前端js
}else{
    echo json_encode(['msg' => '未收藏过']);  // 使用json格式发送给前端js
}





