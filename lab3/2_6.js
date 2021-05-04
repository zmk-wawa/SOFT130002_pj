var tr;
var table;
var i;

function delt(object) { //要删除一行
    table=object.parentNode.parentNode.parentNode; //这个表格
    tr=object.parentNode.parentNode;
    table.removeChild(tr);
}