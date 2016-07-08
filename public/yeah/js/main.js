$(function() {
	var distance = 12.5,
		total = 0,
		direction = "left";
	var interval = setInterval(function() {
		if (direction == "left") {
			if (total == 87.5) {
				direction = "right";
			} else {
				total += distance;
			}
			$(".main-bg").css("-webkit-transform", "translate3d(-" + (total) + "%,0,0)");
			$(".main-bg").css("-moz-transform", "translate3d(-" + (total) + "%,0,0)");
			$(".main-bg").css("transform", "translate3d(-" + (total) + "%,0,0)");
		} else if (direction == "right") {
			total -= distance;
			if (total == 0) {
				direction = "left";
			}
			$(".main-bg").css("-webkit-transform", "translate3d(-" + (total) + "%,0,0)");
			$(".main-bg").css("-moz-transform", "translate3d(-" + (total) + "%,0,0)");
			$(".main-bg").css("transform", "translate3d(-" + (total) + "%,0,0)");
		}
	}, 5000)
    $(".top").on('click','.login,.regist',function(){
    	$(".popbox").addClass("open");
    	$(".box-center").addClass("fadeIn");
    	$(".qrcode").addClass("bounce");
    })
    $(".popbox").on("click",".close",function(){
    	$(".popbox").removeClass("open");
    	$(".box-center").removeClass("fadeIn");
    	$(".qrcode").removeClass("bounce");
    })
})