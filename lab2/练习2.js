var smallBox = document.getElementById('smallBox');
var mask = document.getElementById('mask');
var bigBox = document.getElementById('bigBox');
var box = document.getElementById('box')
var bigPic = document.getElementById('bigPic')
//鼠标经过小盒子，显示大盒子
smallBox.onmouseover = function() {
    bigBox.style.display = "block";
    mask.style.display = "block";

}

smallBox.onmouseout = function() {
    bigBox.style.display = "none";
    mask.style.display = "none";
}
smallBox.onmousemove = function(event) {
    //遮罩跟随鼠标
    var event = event || widow.event;
    var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
    var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
    //计算mask的位置
    // var boxX = ;
    // var boxY =  ;
    var targetX = pageX - box.offsetLeft - mask.offsetWidth / 2;
    var targetY = pageY - box.offsetLeft - mask.offsetHeight / 2;
    //限制mask移动范围
    if (targetX < 0) {
        targetX = 0;
    }
    if (targetY < 0) {
        targetY = 0;
    }
    if (targetX > smallBox.offsetWidth - mask.offsetWidth) {
        targetX = smallBox.offsetWidth - mask.offsetWidth;
    }

    if (targetY > smallBox.offsetHeight - mask.offsetHeight) {
        targetY = smallBox.offsetHeight - mask.offsetHeight;
    }
    mask.style.left = targetX + "px";
    mask.style.top = targetY + "px";
    //按照比例移动大图
    var bigToMove = bigPic.offsetWidth - bigBox.offsetWidth;
    var maskToMove = smallBox.offsetWidth - mask.offsetWidth;
    var rate = bigToMove / maskToMove;
    bigPic.style.left = -rate * targetX + "px";
    bigPic.style.top = -rate * targetY + "px";
}