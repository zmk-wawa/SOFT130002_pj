$(function () {
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
