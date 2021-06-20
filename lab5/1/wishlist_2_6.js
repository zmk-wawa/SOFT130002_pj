$(function () {
    var id = getQueryVariable('id');
    let userID = $.cookie('userID');

    // 使用ajax获取指定id的内容，data 传入参数id
    $.ajax({
        url: "./resources/server/wish_list.php",
        type: "POST",
        dataType: "json",
        data: {
            userID: userID,  // 为用户userID
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
                            <td class="td3">${data[i]['timeCollect']}</td>
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
})