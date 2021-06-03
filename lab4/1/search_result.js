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