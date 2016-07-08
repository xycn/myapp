
var Flag = true,target,targetdes;

function rotate(name) {
   
        Flag = false;
        var randNum = parseInt(encryptionCode(name));
        var $tar = $('#rotatebg'),
        cnt = 100,                         //ratio的索引
        total = 0,                          //已旋转角度
        ratio = [],                         //创造加速度效果     
        //offangle = Math.floor(Math.random() * 360);
        offangle = randNum % 360;
        ratio[1] = [10, 10, 15, 20, 25, 30, 35, 39, 41, 45];
        ratio[2] = [45, 41, 39, 35, 30, 25, 20, 15, 10, 10];
        
        for (i = 0; i < 200; i++) {
            setTimeout(function () {
                var deg = (ratio[String(cnt).substr(0, 1)][String(cnt).substr(1, 1)]);
                var ofdeg = (total + deg) % 360;
                //  console.log(curindex);
                drawWheel(ofdeg);
                total += deg;
                //console.log(total);
                cnt++;
            }, i * 50);
        }

        for (var j = 0; j < offangle / 10; j++) {
            setTimeout(function () {
                var deg = 10;
                var ofdeg = (total + deg) % 360;
                //console.log(ofdeg);
                drawWheel(ofdeg);
                total += deg;
            }, 201 * 50 + j * 50);

            if (fxlx == "1") {
                setTimeout(function () {
                    $(".mask").css("bottom", "0%");
                }, 201 * 50 + j * 46);
            }
        }

        setTimeout(function () {
            target = drawWheel(total % 360, "target");
            targetdes = drawWheel(total % 360, "targetdes");
            Flag = true;
        }, (200 + offangle / 10) * 50 + 10);

        setTimeout(function () {
            $('#result').show();
            console.log(fxlx);
            if(fxlx!="1"){
            $(".mask").css("bottom", "0%");}
            $('#info').html(info.replace('name','<span>&nbsp;'+name+'&nbsp;</span>'));
            if(fxlx=="1"){
                $('#rtname').text("*****");
                if (targetdes.length > 0) {
                    $('#redes').text(targetdes.substr(0, 6) + "* * * * * * * * * * * * * *");
                }
            	$('#share').text("分享看结果");
            }
            else{
                $('#rtname').text("\"" + target + "\"");
                $('#redes').text(targetdes);
            }           
        }, (200 + offangle / 10) * 50 +11);  
}
//获取字符unicode值的和
function encryptionCode(str) {
    var len = str.length;
    var rs = "";
    for (var i = 0; i < len; i++) {
        var k = str.substring(i, i + 1);
        rs += str.charCodeAt(i);
    }
    return rs;
}
