## LAB4

### 一、实现

#### 0.0连接数据库

````php
<?php

/*
 数据库配置文件
*/
// $con=mysqli_connect("IP地址，本机的话localhost也可以","数据库账号","数据库密码","数据库名称");

$con=mysqli_connect("localhost","root","","lab4_sql");
// 检查连接
if (!$con)
{
    die("连接错误: " . mysqli_connect_error());
}
````

#### 0.1获取当前页面url参数

````js
// 获取 url 参数方法
function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
````

#### 1.首页

##### （1）热门图片展示

	###### 	PHP文件：index_top3.php

````php
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
````

​	如注释所示:

* 定义SQL语句：select，从artworks中获取访问量前三的artwork的数据；

* 调用`mysqli_query`函数执行SQL语句，在数据库中找到对应的东西；

* 将结果存入关联数组中，并按照JSON格式发送给前端JS。

  ###### JS文件：top3_new3.js(节选)

```javascript
(function () {
    // 页面加载完执行
    $.ajax({
        url: './resources/server/index_top3.php',
        type: "GET",
        dataType: 'json',
        success: function (data) {
            // 请求成功返回数据
            // console.log(data);
            // 把接收到的数据渲染到页面"lab2_2.html?id=${data[0]['artworkID']}" 给访问的页面传一个参数
            let html = `
            <div class="carousel-item active">
                 <a href="lab2_2.html?id=${data[0]['artworkID']}"><img src="resources/img/${data[0]['imageFileName']}"></a>
             </div>
             <div class="carousel-item">
                 <a href="lab2_2.html?id=${data[1]['artworkID']}"><img src="resources/img/${data[1]['imageFileName']}"></a>
             </div>
             <div class="carousel-item">
                 <a href="lab2_2.html?id=${data[2]['artworkID']}"><img src="resources/img/${data[2]['imageFileName']}"></a>
             </div>
          `;

            $('.miss_img').html(html);

        },
        error: function (err) {
            // 请求失败返回数据
            console.log(err);
        }
    })
})
```

​	如注释所示:

* 调用ajax方法，使用GET请求，从上述PHP中获取存放热度最高的三个作品信息的关联数组data；
* 然后调用html方法，将对应的信息填入首页头图轮播的html中；
* 同时别忘记点击对应跳转（具体解释见“商品详情页”）。

##### （2）显示最新上传的三个商品

###### 	PHP文件：new3.php

```php
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
```

​	实现同`index_top3.php`，取出的是上传时间最晚的三个。

###### 	JS文件：top3_new3.js(节选)

````js
$(function (){
    //页面已加载好
    $.ajax({
        url: './resources/server/new3.php' ,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            console.log(data);
            let html =`
                <tr>
                    <td>
                        <a href="lab2_2.html?id=${data[0]['artworkID']}">
                        <img src="resources/img/${data[0]['imageFileName']}"></a>
                    </td>
                    <td>
                        <a href="lab2_2.html?id=${data[1]['artworkID']}">
                        <img src="resources/img/${data[1]['imageFileName']}"></a>
                    </td>
                    <td>
                        <a href="lab2_2.html?id=${data[2]['artworkID']}">
                        <img src="resources/img/${data[2]['imageFileName']}"></a>
                    </td>
                </tr>
            `;

            $(`.new_img`).html(html);

            let html2 =`
                <tr>
                    <td>
                        <a class="atype2" href="lab2_2.html?id=${data[0]['artworkID']}">View Details</a>
                    </td>
                    <td>
                        <a class="atype2" href="lab2_2.html?id=${data[1]['artworkID']}">View Details</a>
                    </td>
                    <td>
                        <a class="atype2" href="lab2_2.html?id=${data[2]['artworkID']}">View Details</a>
                    </td>
                </tr>
            `;
            $(`.detail_img`).html(html2);
        },
        error: function (err) {
            // 请求失败返回数据
            console.log(err);
        }
    })
})
````

​	实现同热门图片展示中的JS。



#### 2.商品展示页

##### （1）艺术信息展示&访问量更新

###### 	PHP文件：tab2_2.php

````php
<?php
/*
 查询数据库热度前三的数据
 使用POST接收参数id
*/

include "./config.php";  // 引入数据库配置文件

$id = $_POST['id'];  // 接收ajax传来的参数
// $id = 425;

$sql = "select * from artworks where artworkID='$id'";  // sql语句

$query= mysqli_query($con,$sql);  // 执行sql语句

$arr = array();
$i=0;
while ($row=mysqli_fetch_assoc($query)){
	// 将结果存到数组中
	$arr[$i] = $row;
	$i++;
}

echo json_encode($arr);  // 使用json格式发送给前端js
````

​	如注释所示：

* 通过JS获取应该跳转至的商品的`artworkID`；

* 在`artworks`数据库表中找到商品信息，存入关联数组中，发送给下面所示的JS前端。

  ###### JS文件：2_fill.js（节选）

````js
$(function () {
    var id = getQueryVariable('id');

    // 使用ajax获取指定id的内容，data 传入参数id
    $.ajax({
        url: "./resources/server/tab2_2.php",
        type: "POST",
        dataType: "json",
        data: {
            id: id
        },
        success: function(data) {
            console.log(data[0]);
            let html = `
                    <p class="p4 p3">painted ${data[0]['yearOfWork']}</p>
                    <p>Name:《 ${data[0]['title']} 》</p>
                    <p>Dimensions: ${data[0]['width']} cm × ${data[0]['height']} cm</p>
                    <p>Medium: Oil on canvas</p>
                    <p>Subject: Portrait</p>
                    <p>Location:Museum of Mauris,The Hague,Netherlands</p>
                    <p class="p3">HEAT:${data[0]['view']}</p>
                    <hr>
                    <p class="p3">Price:${data[0]['price']} USD</p>
                `;
            $('#p1').html(data[0]['title']);  // 替换标题
            $('#p2').html(data[0]['artist']);  // 替换作者
            let src = `resources/img/${data[0]['imageFileName']}`;  // 图片路径
            $('.miss_bg img').attr('src',src)
            $('.miss_sec').html(html);
            let views = Number(data[0]['view']) + 1;
            view(data[0]['artworkID'],views);
        },
        error: function(err) {
            console.log(err);
        }
    })
````

​	如注释所示：

* 调用ajax方法，使用POST请求，从上述PHP中获取应该展示的图片的信息；

* 然后调用html方法，将对应的信息填入div中。

  ###### 访问量设置函数

````js
function view(id,view) {
        $.ajax({
            url: "./resources/server/view.php",
            type: "POST",
            dataType: "json",
            data:{
                id: id,
                view: view
            },
            success: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log(err);
            }
        })
    }

})
````

​	用于在访问当前商品页面时，将当前访问量设置回数据库（其中访问量增加在上一个js函数中，此函数只负责返回）。

##### （3）收藏功能

###### 收藏JS：2_fill.js（节选）

````js
$('.miss_add').click(function() {
        $.ajax({
            url: "./resources/server/add.php",
            type: "POST",
            dataType: "json",
            data: {
                id: id,
                userID: 1 
            },
            success: function(data) {
                alert(data['msg'])
                if(data['msg'] == '收藏成功') {
                    window.location.href = './lab2_6.html'
                }
            },
            error: function(err) {
                console.log(err);
            }
        })
    })
````

​	点击收藏按钮后：

* 调用ajax方法，使用POST请求，与`add.php`（详情见收藏页面）进行交互；

* 交互成功后，查看是否收藏成功（详见收藏页面）。

  * 若成功，则弹出收藏成功框
  * 或是已收藏过，弹出已收藏框

  ###### 取消收藏JS：2_fill.js（节选）

````JS
$(`.delet`).on(`click`,function (){
    var id = getQueryVariable('id');    //获取当前页面商品的id
    // 使用ajax获取指定id的内容，data 传入参数id
    $.ajax({
        url: "./resources/server/del.php",
        type: "POST",
        dataType: "json",
        data: {
            userID: 1,  // 为用户userID
            artworkID: id,
        },
        success: function(data) {
            console.log(data);
            if(data['msg'] == '删除成功') {
                alert('删除成功');
            }
            if(data['msg'] == '未收藏过') {
                alert('未收藏过');
            }
        },
        error: function(err) {
            console.log(err);
        }
    })
})
````

​	点击取消收藏后：

* 调用ajax方法，使用POST请求，与`del.php`（详情见收藏页面）进行交互；
* 交互成功后，查看是否删除成功（详见收藏页面）。
  * 若成功，则弹出删除成功框
  * 或是未存在与收藏夹中，则弹出未收藏框



#### 3.搜索页

##### 	搜索选项与排序的实现&伪分页

###### 	PHP文件：search.php

````js
<?php

include "./config.php";

$keywords = $_POST['keywords']; //获取关键词
$kind = $_POST['kind'];  // 作品
$sort_method = $_POST['sort_method']; // 时间

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
````

​	如注释所示:

* 从JS前端获取对应参数`keywords`、`kind`、`sort_method` ，以此作为条件定义SQL语句；
* 定义SQL语句：select，从artworks中按照`keywords`在`kind`中模糊查找对应数据，并按照`sort_method`升序排列 ；
* 调用`mysqli_query`函数执行SQL语句，在数据库中找到对应的东西；
* 将结果存入关联数组中，并按照JSON格式发送给前端JS。

###### 	JS文件：search_result.js（节选）

````js
var arr = [];
$(function () {

    var keywords = getQueryVariable('keywords');
    var kind = getQueryVariable('kind');
    var sort_method = getQueryVariable('sort_method');
    $.ajax({
        url: "./server/search.php",
        type: "POST",
        dataType: "json",
        async:false,
        data: {
            keywords: keywords,
            kind: kind,
            sort_method: sort_method
        },
        success: function (data) {
            arr = data;
            var html = '';
            html = `
                   <a href="lab2_2.html?id=${data[0]['artworkID']}">
                        <img src="resources/img/${data[0]['imageFileName']}" alt="加载中" id="img3">
                   </a>                 
                   <ul>
                        <li>作品名： ${data[0]['title']}</li>
                        <li>作者： ${data[0]['artist']}</li>
                        <li>简介： ${data[0]['description']} </li>
                   </ul>             
            `;
            $('.ul').append(html);

            $(`s1`).append(`<a href="javascript:;" class="atype2 last">上一页</a>`)
            $(`s2`).append(`<a href="javascript:;" class="atype2 next">下一页</a>`)

            for(let i = 0; i < data.length; i++) {

                $('.span').append(`<a href="javascript:;" onclick="views(${i});" class="atype2 change">${i+1}</a>`)
            }

            var flag = 1;


            $('.next').on('click',function () {
                html = `
                                <a href="lab2_2.html?id=${data[flag]['artworkID']}">
                                    <img src="resources/img/${data[flag]['imageFileName']}" alt="加载中" id="img3">
                                </a>
                                <ul>
                                    <li>作品名： ${data[flag]['title']}</li>
                                    <li>作者： ${data[flag]['artist']}</li>
                                    <li>简介： ${data[flag]['description']} </li>
                                </ul>
                            `;
                $('.ul').html(html);
                //恢复
                $('.change:nth-child('+ flag +')').css('background-color',"#fcc");
                $('.change:not(:nth-child('+flag+'))').css('background-color',"#fff");
                flag++;
            })

            $('.last').on('click',function () {
                flag--;
                html = `
                                <a href="lab2_2.html?id=${data[flag]['artworkID']}">
                                    <img src="resources/img/${data[flag]['imageFileName']}" alt="加载中" id="img3">
                                </a>
                                <ul>
                                    <li>作品名： ${data[flag]['title']}</li>
                                    <li>作者： ${data[flag]['artist']}</li>
                                    <li>简介： ${data[flag]['description']} </li>
                                </ul>
                            `;
                $('.ul').html(html);
                $('.change:nth-child('+ flag +')').css('background-color',"#fcc");
                $('.change:not(:nth-child('+flag+'))').css('background-color',"#fff");
            })

            if(flag>=data.length){
                $('body').off('click','.next')
            }
            if(flag<0){
                $(`body`).off('click',`last`)
            }
        },
        error: function (err) {
            console.log(err)
        }
    })

    if(arr.length==0){
        window.location.href='lab2_5_null_result.html';
    }

})
````

​		如注释所示：

* 调用ajax方法，使用POST请求，从`search.php`中获取满足搜索要求的艺术品信息；
* 然后调用html方法，将对应的信息填入div中（分页渲染方式见下）。

###### 分页渲染：search_result.js（节选）

````js
// 点击数字进行对应页面渲染
function views(s) {
    html = `
        <a href="lab2_2.html?id=${arr[s]['artworkID']}">
        <img src="resources/img/${arr[s]['imageFileName']}" alt="加载中" id="img3">
        </a>
        <ul>
            <li>作品名： ${arr[s]['title']}</li>
            <li>作者： ${arr[s]['artist']}</li>
            <li>简介： ${arr[s]['description']} </li>
        </ul>                   `
    $('.ul').html(html);
    // console.log($('.change:nth-child(s)'))
    let flag = s + 1;
    $('.change:nth-child('+ flag +')').css('background-color',"#fcc");
    $('.change:not(:nth-child('+flag+'))').css('background-color',"#fff");
}
````

* 采用了伪分页的形式，一次展示一件艺术品
* 点击对应数字渲染对应的商品



#### 4.个人收藏页

##### （1）收藏列表展示

###### 	PHP文件：wish_list.php

````js
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
````

​	如注释所示：

* 从JS中获得`userID`，作为定义SQL语句的参数

* 定义SQL语句，select，从数据库表carts中查找userID是`userID`的对应艺术品的`artworkID`,随后在数据库表artworks中获得artworkID为`artworkID`的艺术品信息；

* 调用`mysqli_query`函数执行SQL语句，在数据库中找到对应的东西；

* 将结果存入关联数组中，并按照JSON格式发送给前端JS。

  ###### PHP文件：add.php

```php
<?php
   header("Content-type:text/html; charset=utf-8");
   // 制定允许其他域名访问
header("Access-Control-Allow-Origin:*");
// 响应类型
header('Access-Control-Allow-Methods:POST');
// 响应头设置
header('Access-Control-Allow-Headers:x-requested-with, content-type');
   include 'config.php';


$id=trim($_POST['id']);	//trim移除artworkID两侧的字符串，使其以数字字符串形式存入$id
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
```

​	如注释所示：

* 从JS中获得`userID`、`id`，作为定义SQL语句的参数
* 定义SQL语句，select，从数据库表carts中查找userID是`userID`且artworkID是`id`的艺术品信息；
* 调用`mysqli_query`函数执行SQL语句；
  * 如果$id或者$userID为空，则传输错误
  * 反之
    * 若carts数据库表中有，则已收藏过
    * 反之，未收藏过，收藏
* 断开连接。

###### JS文件：

`````JS
$(function () {
    var id = getQueryVariable('id');
    

    // 使用ajax获取指定id的内容，data 传入参数id
    $.ajax({
        url: "./resources/server/wish_list.php",
        type: "POST",
        dataType: "json",
        data: {
            userID: 1,  // 为用户userID
        },
        success: function(data) {
            console.log(data);
            let html = '';
            for(let i = 0; i < data.length; i++) {

                html = `
                    <tr class="tr1">
                            <td class="td2">
                                <a href="lab2_2.html?id=${data[i]['artworkID']}"><img class="imgSize" src="resources/img/${data[i]['imageFileName']}" alt="图1"></a>
                            </td>
                            <td class="td3">${data[i]['title']}</td>
                            <td class="td3">${data[i]['artist']}</td>
                            <td class="td1">${data[i][`description`]}</td>
                            <td class="td3">${data[i]['timeReleased']}</td>
                            <td><a class="atype2" onclick="delt(this,${data[i]['artworkID']})">Delete</a></td>
                        </tr>
                    `;
                $(`.miss_body`).append(html); //不断增加
            }

        },
        error: function(err) {
            console.log(err);
        }
    })
`````



##### （2）取消收藏

###### 	PHP文件：del.php

````php
<?php
/*
 查询数据库热度前三的数据
 没有接前端参数（不需要参数）
*/

include "./config.php";  // 引入数据库配置文件

$userID = $_POST['userID'];
$artworkID = $_POST['artworkID'];

//select 字段列表/* from 表名 where 条件 order by 字段名1 asc/desc, 字段名2 asc/desc,…
$sql = "delete from carts where userID='$userID' and artworkID='$artworkID'";  // sql语句,desc降序

$query= mysqli_query($con,$sql);  // 执行sql语句，在$con对应的数据库中查找$sql中对应的东西

if($query) {
	echo json_encode(['msg' => '删除成功']);  // 使用json格式发送给前端js
} else{
    echo json_encode(['msg' => '未收藏过']);    // 使用json格式发送给前端js
}
````

​	如注释所示，同add.php：

* 从JS获取要取消收藏的艺术品的`userID`与`artworkID`，作为定义sql的参数；
* 定义SQL语句，select，从数据库表carts中查找userID是`userID`且artworkID是`id`的艺术品信息；
* 调用`mysqli_query`函数执行SQL语句；
  * 若未查找到，则显示未收藏过
  * 若查找到，则删除，并显示删除成功
