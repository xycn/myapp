window.addEventListener('DOMContentLoaded',manaXML,false);
var cvwidth, cvheight, cvbg;
var title, info,mine;
var noEqual = false, noBgpic = true, bgarrload=false,pointerload = false, cvbgload=false,borderload=false, angle = 0, Eangle = 0, arc, bordercolor,bordersrc,pointersrc,cvbgsrc;
var num, pointer, border, bgarr = [], desVals = [], optionVals = [], redesVals = [],reVals=[], fontColors = [], desColors=[],optionBgs = [], optionPts = [], optionFonts = [],desFonts=[], ranges = [];
var shareInfo,shareImgSrc,symbol,landurl,fxlx ;
function manaXML() {
    cvwidth = $("#wheels").width(); cvheight = $("#wheels").height();
    $("#wheels").attr("height", cvheight).attr("width", cvwidth);
    $.get("config/tb.xml", function (data) {
        var tb = $(data).find("turntable").children("template");
        title = $(tb).find("form").text();
        $("#title,title").html(title);
        info = $(tb).find("info").attr("value");
        cvbgsrc = $(tb).attr("bgvalue");
        bordercolor = $(tb).attr("bordercolor");
        pointersrc = $(tb).attr("pointer");
        infobg = $(tb).find("info").attr("bgvalue");
        bordersrc = $(tb).attr("borderimage");
        if (bordersrc != "" &&bordersrc!=undefined) {
            border = new Image()
            border.onload = function () {
            borderload = true;
            }
            border.src = bordersrc;
        }
        else {
            borderload = true;
            bordercolor = $(tb).attr("bordercolor");
        }
        shareInfo = $(tb).find("share").attr("title");
        shareImgSrc = $(tb).find("share").attr("image");  
        $('#simg').attr("src", shareImgSrc);
        $('.sinfo').text(title);
        symbol=$(tb).attr("symbol");
        landurl=$(tb).attr("landurl");
        fxlx = $(tb).attr("fxlx");
        mine = $(tb).attr("mine");
        console.log(mine);
        var options = $(tb).find("option");
        num = options.length;
        arc = 2 * Math.PI / num;
        $(options).each(function () {
            optionVals.push($(this).attr("value"));
            desVals.push($(this).attr("desval"));
            optionBgs.push($(this).attr("bgvalue"))
            optionPts.push($(this).attr("percent"));
            optionFonts.push($(this).attr("font"));
            desFonts.push($(this).attr("desfont"));
            fontColors.push($(this).attr("fontcolor"));
            desColors.push($(this).attr("descolor"));
            redesVals.push($(this).attr("redes"));
            reVals.push($(this).text());
        });
        if ($(options).parent().attr("percenttype") == "1") {
            noEqual = true;
            $(optionPts).each(function (index, item) {
                var angle0 = 2 * Math.PI * optionPts[index] / 100;
                if (index > 0) {
                    angle = Eangle;
                }
                Eangle += angle0;
                ranges.push({ min: angle, max: Eangle });
                
            });
        }
        else {
            for (var i = 0; i < num; i++) {
                angle = i * arc;
                Eangle = angle + arc;
                ranges.push({ min: angle, max: Eangle });
            }
        }
        pointer = new Image();
        pointer.onload = function () {
            pointerload = true;
        };
        pointer.src = pointersrc;

        cvbg = new Image();
        cvbg.onload = function () {
            cvbgload = true;
        }
        cvbg.src = cvbgsrc;
        if ($(options).parent().attr("bgtype") == "1") {
            noBgpic = false;
            loadbgarr();
        }
        else {
            bgarrload=true;
        }
        imgDone();
        //console.log(optionBgs);
        //console.log(optionFonts);   
    });
}
var len = bgarr.length;
function loadbgarr() {
    for (var i = 0; i < num; i++) {
        var name = "bg" + i;
        var name = new Image();
        bgarr.push(name);
    }   
    $(bgarr).on("load", function () {
        //  console.log($(this).attr("src") + "load");
        len--;      
        if(len<=0){
        	bgarrload=true;
        	return;
        }
    });
    $(bgarr).each(function (index, item) {
        item.src = optionBgs[index];
        //console.log(index + "" + optionBgs[index] + "--" + optionBgs.length);
    });
}

function imgDone() {
    //img全部加载完成
    if (bgarrload&& pointerload&&cvbgload&&borderload) {        
      
        if (mine == undefined) {
            selectmine();
        }
        drawWheel(NaN);
    }
    else {
        setTimeout('imgDone()', 1);
    }
}

function drawWheel(ofdeg, get) {
    //startAngle = 0;
    var canvas = document.getElementById("wheels");
    if (canvas.getContext) {
        var outsideRadius = cvwidth / 2 - cvwidth * 0.025;
        var textRadius = cvwidth / 2 - cvwidth * 0.15;
        var insideRadius = 37;
       var ctx = canvas.getContext("2d");
        //ctx.fillStyle =cvbg|| ctx.createPattern(cvbg, 'repeat');
        //ctx.fillRect(0, 0, cvwidth, cvheight);
        ctx.clearRect(0, 0, cvwidth, cvheight);
        ctx.drawImage(cvbg, 0, 0, cvwidth, cvheight);
        if (bordersrc != "" && bordersrc != undefined) {
            ctx.strokeStyle=ctx.createPattern(border, 'repeat');
        }
        else {
            ctx.strokeStyle = bordercolor;
        }
        ctx.lineWidth = 15;
        var curindex;
        //获取索引
        $(ranges).each(function (index, item) {
            var actangle = ((ofdeg + 270) % 360) / 360 * 2 * Math.PI; 
            //console.log(item.min+"=="+actangle + "--" + item.max);
            if (actangle >= item.min && actangle < item.max) {
                curindex = index; actangle = null;
                return;
            }
        });
        //console.log(ranges);
        //  console.log(curindex);
        for (var i = 0; i < num; i++) {
            
            if (curindex == i) {
                ctx.fillStyle = "#fff";
            }
            else {
                if (noBgpic) {
                    ctx.fillStyle = optionBgs[i];
                }
                else {
                    ctx.fillStyle = ctx.createPattern(bgarr[i], 'repeat');
                }
                //console.log(bgarr[i]);
            }
            //console.log(curindex + "--" + ofdeg);
            //console.log(i);
            ctx.beginPath();
            ctx.arc(cvwidth / 2, cvheight / 2, outsideRadius, ranges[i].min, ranges[i].max, false);
            ctx.stroke();
            ctx.arc(cvwidth / 2, cvheight / 2, insideRadius, ranges[i].max, ranges[i].min, true);
            ctx.fill();
            ctx.save();
//          ctx.font = optionFonts[i];
            ctx.font=optionFonts[i];
            //ctx.shadowOffsetX = -5;
            //ctx.shadowOffsetY = 6;
            //ctx.shadowBlur = 3;
            //ctx.shadowColor = "#404040";
            if (curindex == i) {
                ctx.fillStyle = "#E71859";
            }
            else {
                ctx.fillStyle = fontColors[i];
            }
            var curw=cvwidth / 2 + Math.cos(ranges[i].min + (ranges[i].max - ranges[i].min) / 2) * textRadius;
            var curh = cvheight / 2 + Math.sin(ranges[i].min + (ranges[i].max - ranges[i].min) / 2) * textRadius;
            ctx.translate(curw, curh);
            //ctx.rotate(ranges[i].min + (ranges[i].max - ranges[i].min) / 2+ Math.PI / 2);  
            //ctx.rotate(Math.PI/3);
            var text = optionVals[i];
            //console.log(text);
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);           
            ctx.restore();
            ctx.save();
            ctx.translate(curw, curh + 20);
            ctx.font = desFonts[i];
            if (curindex == i) {
                ctx.fillStyle = "#E71859";
            }
            else {
                ctx.fillStyle = desColors[i];
            }
            ctx.fillText(desVals[i], -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        }
        ctx.save();
        ctx.translate(cvwidth / 2, cvheight / 2);
        ctx.rotate(ofdeg / 360 * 2 * Math.PI);
        ctx.drawImage(pointer, -93, -93, 186, 186);
        ctx.restore();
        if (get) {
            if (get == "target") {
                console.log(optionVals[curindex]);
                return reVals[curindex];
            }
            if (get == "targetdes")
            { return redesVals[curindex]; }
        }
    }
}

//转盘转动参数（暂不用）
//spinTimeout = null;
//spinArcStart = 10;
//spinTime = 0;
//spinTimeTotal = 0;
//以下暂不使用
function startRotateWheel() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 6 * 1000;
    var result = rotateWheel();
    if (result) {
        alert(result);
    }
}
function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        return stopRotateWheel();
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawWheel();
    spinTimeout = setTimeout('rotateWheel()', 50);
}
function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var offset = 360 - degrees % 360;
    var index = Math.floor(offset / arcd);
    //以下注释部分手机浏览会崩溃，可能是使用全局ctx的原因，具体不详。
    //   ctx.save();
    // ctx.font = 'bold 30px sans-serif';
    var text = optionTxts[index];
    return text;
    // ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    // ctx.restore();
}

function easeOut(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}
