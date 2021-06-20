$(function () {
    var id = getQueryVariable('id');
    let userID = $.cookie('userID');

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

    $('.miss_add').click(function() {
        if($.cookie('username') == undefined) {
            alert('请先登录')
        }else {
            $.ajax({
                url: "./resources/server/add.php",
                type: "POST",
                dataType: "json",
                data: {
                    id: id,
                    userID: userID
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
        }
        
    })

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


$(`.delet`).on(`click`,function (){
    var id = getQueryVariable('id');    //获取当前页面商品的id
    let userID = $.cookie('userID');
    // 使用ajax获取指定id的内容，data 传入参数id
    $.ajax({
        url: "./resources/server/del.php",
        type: "POST",
        dataType: "json",
        data: {
            userID: userID,  // 为用户userID
            artworkID: id,
        },
        success: function(data) {
            console.log(data);
            alert(data['msg']);
        },
        error: function(err) {
            console.log(err);
        }
    })
})
