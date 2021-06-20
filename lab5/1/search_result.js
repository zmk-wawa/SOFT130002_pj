var arr = [];
$(function () {

    var keywords = getQueryVariable('keywords');
    var kind = getQueryVariable('kind');
    var sort_method = getQueryVariable('sort_method');
    $.ajax({
        url: "./resources/server/search.php",
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
            var flag = 0;
            for(flag=0;flag < 5; flag++){
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
                $('.ul').append(html);
            }
            

            $(`s1`).append(`<a href="javascript:;" class="atype2 last">上一页</a>`)
            $(`s2`).append(`<a href="javascript:;" class="atype2 next">下一页</a>`)

            for(let i = 0; i < data.length / 5; i++) {

                $('.span').append(`<a href="javascript:;" onclick="views(${i+1});" class="atype2 change">${i+1}</a>`)
            }

            


            $('.next').on('click',function () {
                for(flag; flag < flag+5; flag++) {
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
                
                }
                $('.change:nth-child('+ flag/5 +')').css('background-color',"#fcc");
                $('.change:not(:nth-child('+flag/5+'))').css('background-color',"#fff");
                
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

    // if(arr.length==0){
    //     window.location.href='lab2_5_null_result.html';
    // }

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
    $('.ul').html('');
    let a = s * 5;
    let x = s * 5 - 5;
    // console.log(s)
    // console.log(a)
    for(x; x < a; x++) {
        console.log(x)
        // console.log(a)
        html = `
        <a href="lab2_2.html?id=${arr[x]['artworkID']}">
        <img src="resources/img/${arr[x]['imageFileName']}" alt="加载中" id="img3">
        </a>
        <ul>
            <li>作品名： ${arr[x]['title']}</li>
            <li>作者： ${arr[x]['artist']}</li>
            <li>简介： ${arr[x]['description']} </li>
        </ul>                   `
    $('.ul').append(html);
    // console.log($('.change:nth-child(s)'))
    
    
    }
    let flag = s;
    console.log(flag)
    $('.change:nth-child('+ flag +')').css('background-color',"#fcc");
    $('.change:not(:nth-child('+flag+'))').css('background-color',"#fff");
    
}