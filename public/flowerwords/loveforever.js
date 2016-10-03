/**
*本作品为原创作品，转载请注明出处
*author:amosworker
*QQ:348914779
*/

var textInput = document.getElementById('textInput');
var canvas = document.createElement('canvas');
canvas.width="300";
canvas.height="30";
var context = canvas.getContext("2d");
context.font = "18px Arial";
context.textBaseline="top";

function getQueryString(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var r = window.location.search.substr(1).match(reg);  
    if (r != null) return decodeURIComponent(r[2]);  
    return null;  
}  


function drawText(){
	var text;
	var textUrl = getQueryString('text');
	
	text = textUrl?textUrl:"Love you";
	textInput.value=text;
	
	context.clearRect(0, 0, canvas.width,canvas.height);
	context.fillText(text,0,0);
	var newImage = resetScaleCanvas(context,1);
	setText(newImage,20);
	$('#editgroup').removeClass('show');
	$('#btn-edit').addClass('show');
}

function setText(imageObj,liWidth){
	var ulshow = document.getElementById('showUl');
	var ulstr = '';
	var maxleft = 0;
	var maxtop = 0;
	for(var i=0;i<imageObj.data.length;i++){
		if(imageObj.data[i]>60){
			var leftv = i%imageObj.w*liWidth;
			var topv = Math.floor(i/imageObj.w)*liWidth;

			var x = Math.ceil(2000*Math.random()-1000);
			var y = Math.ceil(2000*Math.random()-1000);
			var z = Math.ceil(4000*Math.random()-2000);
			var delay = parseInt(Math.random()*50)/100+'s';
			var transitioncss = 'all 1s ease '+delay;
			var transition = '-webkit-transition:'+transitioncss+';-o-transition:'+transitioncss+';transition:'+transitioncss+';';

			var tranlate = 'translate3d('+x+'px,'+y+'px,'+z+'px)';
			var style = 'style="opacity:0;left:'+ leftv + "px;top:"+ topv +"px;" +transition+'-webkit-transform:'+tranlate+';-ms-transform:'+tranlate+';-o-transform:'+tranlate+';transform:'+tranlate+';"';
			ulstr += '<li '+ style +'></li>';

			if(maxleft<leftv){
				maxleft = leftv;
			}
			if(maxtop<topv){
				maxtop = topv;
			}	
		}
	}
	ulshow.style.width = (maxleft+liWidth)+'px';
	ulshow.style.height = (maxtop+liWidth)+'px';
	ulshow.innerHTML = ulstr;

	resizeUl();	

	setTimeout(function(){
		setTextAnimation();
	},500);
}

function resizeUl(){
	var r = ($(window).width()-20)/$('#showUl').width();
	if(r<1){
		$('#showUl').css({'transform':'scale('+r+','+r+')'});
	}else{
		$('#showUl').css({'transform':'scale(1,1)'});
	}
}

function setTextAnimation (){
	resizeUl();
	$('#showUl li').each(function(key){
		var deg = Math.random()*360;
		var scale = ' scale('+(Math.random()*1+1)+') ';

		if((key+1)%5 == 0){
			scale = ' scale('+(Math.random()*1+1.5)+') ';
		}

		var style = 'translate3d(0,0,0) rotate('+ deg +'deg)'+scale;

		$(this).css({
			'transform':style,
			'opacity':1
		});
	});
}

function resetScaleCanvas(context,rangeWidth){
	var range = rangeWidth ? rangeWidth : 1;
	var imageData = context.getImageData(0,0,canvas.width,canvas.height).data;
	var cw = canvas.width;
	var ch = canvas.height;
	var hn = Math.ceil(ch/range);
	var wn = Math.ceil(cw/range);
	var imageDataNew = [];
	var tmpArr = [];

	for(var i=0; i<hn; i++ ){
		for(var j=0; j<wn; j++){
			var L = 0;
			var pixel = [0,0,0,0];
			var vv,hv;

			if(j==(wn-1)){
				vv = cw-1 - (wn-1)*range;
			}else{
				vv = range-1;
			}

			if(i==(hn-1)){
				hv = ch-1 - (hn-1)*range;
			}else{
				hv = range-1;
			}

			for(; vv>=0;vv--){
				for(; hv>=0;hv--){
					var tmpn = (i*range+hv)*cw*4 + (j*range+vv)*4;
					pixel[3] += imageData[tmpn+3];
					L++;
				}
			}

			imageDataNew.push(Math.floor(pixel[3])/L);
		}
	}

	return {
		data:imageDataNew,
		w:wn,
		h:hn
	};
}


$('#btn-edit').click(function(){
	$(this).removeClass('show');
	$('#editgroup').addClass('show');
});

$('#sub').click(function(){
	var v = $.trim(textInput.value);
	window.location.replace(window.location.origin+window.location.pathname+'?text='+encodeURIComponent(v));
});

window.addEventListener("orientationchange", function() {
    if (window.orientation == 180 || window.orientation == 0 || window.orientation == 90 || window.orientation == -90) {
        drawText();
    }
}, false);

drawText();

