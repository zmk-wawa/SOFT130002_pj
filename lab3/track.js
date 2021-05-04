//第一步 ，赋值拿取arr
//打开第一个界面时，localStorage中为空，则创建arr空数组
//hasOwnProperty——判断是否在locStorage中
//打开第二个界面时，localStorage中不为空，则将上一次存的arr取出赋值给当前arr
console.log( JSON.parse(localStorage.getItem('arr')))
var arr= localStorage.hasOwnProperty('arr') ?JSON.parse(localStorage.getItem('arr')): []

//获取操作元素和内容
var get=document.getElementById("track");
var Title =document.title;  //获取标题
var Url=window.location.href;  //获取url

//第二步 对arr数组处理
if(arr.length == 0 || (arr.length>=1 && arr[arr.length-1].title != Title)){//这个是防止当前页面刷新会重复添加进去
    arr.push({
        title:Title,
        url:Url
    })
}
if(arr.length>3) arr.shift(); //超过3个时，删除最早存进去的元素

localStorage.setItem('arr',JSON.stringify(arr));
console.log(arr,localStorage.getItem('arr'))
//第三步 显示arr
console.log(arr);
var len=arr.length;
for(var i=0;i<len;i++){
    get.innerHTML += "<a href='" + arr[i].url + "' class='aS'>   >   " + arr[i].title + "</a>";
}


//localStorage.clear()





