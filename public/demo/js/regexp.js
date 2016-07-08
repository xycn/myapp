/**
 * Created by tach on 2016/3/21.
 */
var testNum=12345678909876;
var desNum=formatNum(testNum,2);
function formatNum(num,n){
    //参数说明：num 要格式化的数字 n 保留小数位
    num = String(num.toFixed(n));
    var re =new RegExp(/(-?\d+)(\d{3})/) ;
    var $1=re.$1,$2=re.$2;
    while(re.test(num)) {
        num = num.replace(re,"$1,$2");
    }
    return num;
}

var re=/(-?\d+)(\d{3})/;
var ss='123444,789';
var m=ss.match(re);
console.log(m);