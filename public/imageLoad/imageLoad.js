
var myScroll,imgcount=0;
function registerScroll() {
    myScroll = new IScroll('#maskcontent', { scrollX: true, scrollY: false, mouseWheel: true, momentum: false, snap: true });

    myScroll.on('scrollEnd', function () {
         curpage = myScroll.currentPage.pageX + 1;
        if (curpage>imgcount) {
            return;
        }
        $("#download").text(curpage + "/" + imgcount);
        displayImage($("#scroller li").children("div").eq(curpage-1));

    });
}
function setdaynight(light) {
    document.getElementsByTagName("body")[0].className = light;
}
function setFontSize(size) {
    switch (size) {
        case "larger":
            $("#title").removeClass("titlesmaller").addClass("titlelarger");
            $("#article_body p").removeClass("articlesmaller").addClass("articlelarger");
            break;
        case "normal":
            $("#title").removeClass("titlelarger").removeClass("titlesmaller");
            $("#article_body p").removeClass("articlelarger").removeClass("articlesmaller");
            break;
        case "smaller":
            $("#title").removeClass("titlelarger").addClass("titlesmaller");
            $("#article_body p").removeClass("articlelarger").addClass("articlesmaller");
            break;
        default:
    }
}
window.onload = function () {
    setdaynight("night");
    var news = new News();
    var bodys = news.getBody().body;
    var title = news.getTitle();
    var source = news.getSource();
    var time = news.getTime();
    var label = news.getLabel();
    $("#source").html('<span id="source"  >' + time + ' · ' + source + '</span><span  id="label">' + label + '</span>');
    $("#title").html(title);
    $("#article_body").html(bodys);
   //  setFontSize("smaller");
   setFontSize("larger");
    $("img:not(.powerimg)").css({ width: "100%", height: "auto" }).attr("src", "image/small_no_loading.png");
    loadImg();
}

window.onscroll = function () {
    loadImg();
}
//为进入视野的img标签加载src
function loadImg() {
    $("img:not(.powerimg)").each(function (index, item) {
        var Ybottom = item.getBoundingClientRect().bottom;
        var Ytop = item.getBoundingClientRect().top;
        // 出现在视野中
        if ($(window).height() > Ybottom - $(window).scrollTop() && Ybottom > 0 && $(window).height() > Ytop) {
            // console.log("enter");
            if (item.src.indexOf("small_no_loading.png") > -1) {
                setImgSrc(item);
            }
        }
        //消失在视野中
        if ($(window).height() < Ytop || Ybottom < 0) {
            //console.log("exit");
        }
    });
}
$(document).on("click","img:not(.powerimg)",imgClick);
$("#backto").on("click", destoryPowPoint);
//点击图片显示大图
function imgClick(){
//console.log("00--"+$(this).data("src"));
    if(this.src.indexOf("small_no_loading.png")>-1)
    {
        setImgSrc(this);
        return;
	}
    var obj = this;
    initMask(obj);
    $("#mask").animate({ left: "0%" }, "fast", function () { });
    pushHistory();
}
function pushHistory() {
    var state = {
        title: "阅读",
        url: location.href + "#imgread",
        otherkey: ""
    };
    window.history.pushState(state, "", location.href + "#imgread");
    window.addEventListener("popstate", destoryPowPoint, false);
}
function destoryPowPoint() {
    $("#mask").animate({ left: "100%" }, "fast", function () {
        if ($("#mask").attr("left") == "100%") {
            myScroll.destroy();
            $("#imgul").children().remove();
        }
    });
    window.removeEventListener("popstate", destoryPowPoint, false);
}
function initMask(obj) {
    imgcount = $("img:not(.powerimg)").length;
    $("img:not(.powerimg)").each(function () {
        $("#imgul").append('<li><div  data-img="' + $(this).data("src") + '" >loading..</div></li>');
    });
    $("#scroller li").css({ width: (100 / imgcount) + "%" });
    $("#scroller").css({ width: (100 * imgcount) + "%" });

    registerScroll();
    // var index = Number(this.id.replace(/\D+/g, " ")) + 1;
    var index = $("img:not(.powerimg)").index($(obj));
    $("#download").text((index+1) + "/" + imgcount);
    myScroll.goToPage(index,0,0);
    var curpage = myScroll.currentPage.pageX;
    displayImage($("#scroller li").children("div").eq(curpage));
    // $("#mask").addClass("active");//css版动画
}

function setImgSrc(obj) {
    var img = new Image();
    img.onload = function () {
        img.onload = null;
        setTimeout(function () {
            $(obj).get(0).src = $(obj).data("src");
        }, 1000);
    };
   // console.log($(obj).data("src"));
    img.src = $(obj).data("src");
}

function displayImage(obj) {
    var path = $(obj).data('img');
    if (!path) {
        return;
    }
    var img = new Image();
    img.onload = function () {
        img.onload = null;
        $(obj).css({
            backgroundImage: 'url(' + path + ')'
        });
        $(obj).text("");
    };
    img.src = path;
}
function stopEventBubble(e) {
    var evt = e || window.event;
    evt.stopPropagation ? evt.stopPropagation() : (evt.cancelBubble = true);
    e.preventDefault();
}
$("#swh-n-d").on("click",toggledaynight);
function toggledaynight() {
    if ($("body").hasClass("day")) {
        $("body").removeClass("day").addClass("night");
    }
    else {
        $("body").removeClass("night").addClass("day");
    }
}















//单张大图参看图片
function reloadImage(i) {

    if (window.news) {
        var largepic = document.getElementById('largepic' + i);
        var imgcontent = document.getElementById("imgContent_" + i);
        var percent = document.getElementById("percent_" + i);

        if (percent != null &&
            (percent.src == 'file:///android_asset/big_reload_img.png' ||
             percent.src == 'file:///android_asset/small_reload_img.png')) {

            if (null != imgcontent) {
                imgcontent.src = 'file:///android_asset/null_src.png';
            }
            window.news.reloadImg(i);
            return;
        }
    }
}

function updateProgress(i, percent, isBigImg, isTablet, isNoProgress) {
    if (percent == 0) {
        var imgVideo = document.getElementById("videoImg_" + i);
        if (imgVideo != null) {
            imgVideo.style.visibility = "hidden";
        }
    }

    var percent_i = document.getElementById("percent_" + i);
    if (!percent_i) {
        return;
    }

    var state = Math.floor(percent / 10);
    if (state > 9) {
        state = 9;  //不显示100%
    } else if (state < 0) {
        state = 0;
    }

    var url;
    if (isBigImg) {
        url = isNoProgress ? "file:///android_asset/img/no_loading.png" : "file:///android_asset/img/loading" + state + ".png";
    } else {
        url = isNoProgress ? "file:///android_asset/img/small_no_loading.png" : "file:///android_asset/img/small_loading" + state + ".png";
    }
    if (percent_i.src != url) {
        percent_i.src = url;
    }
}
