var tr;
var table;
var i;

function delt(object,id) { //要删除一行
    table=object.parentNode.parentNode.parentNode; //这个表格
    tr=object.parentNode.parentNode;
    table.removeChild(tr);

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
                alert(data['msg'])
            },
            error: function(err) {
                console.log(err);
            }
        })
}