 <?php
 	header("Content-type:text/html; charset=utf-8");
 	// 制定允许其他域名访问
	header("Access-Control-Allow-Origin:*");
	// 响应类型
	header('Access-Control-Allow-Methods:POST');
	// 响应头设置
	header('Access-Control-Allow-Headers:x-requested-with, content-type');
    include 'config.php';


    $id=trim($_POST['id']);
	$userID=$_POST['userID'];
	$sql = "select * from carts where userID='$userID' and artworkID='$id'";
	$info = mysqli_query($con,$sql);
	@$res = mysqli_num_rows($info);

	if(empty($id)){
		echo json_encode(['msg' => '数据传输错误']);
	}else if(empty($userID)){
		echo json_encode(['msg' => '数据传输错误']);
	}else{	
		if($res){
			echo json_encode(['msg' => '已经收藏过了呀']);
		}else{
			$sql1 ="insert into carts(userID,artworkID) values('".$userID."','" .$id."')";   // sql语句中使用变量要用这种方式
			$result = mysqli_query($con,$sql1);
			if($result){
				echo json_encode(['msg' => '收藏成功']);
			}else{
				echo json_encode(['msg' => '收藏失败']);
			}
		}
	}

	// 断开数据库连接
	$con->close();

?>                                           
