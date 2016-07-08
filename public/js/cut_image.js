var postFile = {
    init: function() {
        var t = this;
        t.regional = document.getElementById('label');
        t.getImage = document.getElementById('get_image');
        t.editPic = document.getElementById('edit_pic');
        t.editBox = document.getElementById('cover_box');
        t.px = 0;    //背景图片X轴
        t.py = 0;    //背景图片Y轴
        t.sx = 15;    //裁剪区域X轴
        t.sy = 15;    //裁剪区域Y轴
        t.sHeight = 100;    //裁剪区域高度
        t.sWidth = 100    //裁剪区域宽度
        document.getElementById('post_file').addEventListener("change", t.handleFiles, false);
        document.getElementById('save_button').onclick = function() {
            //绘制剪切图片：
            t.editPic.height = t.sHeight;
            t.editPic.width = t.sWidth;
            var ctx = t.editPic.getContext('2d');
            var images = new Image();
            images.src = t.imgUrl;
            images.onload = function(){
                ctx.drawImage(images,t.sx, t.sy, t.sHeight, t.sWidth, 0, 0, t.sHeight, t.sWidth); //裁剪图片
                document.getElementById('show_pic').getElementsByTagName('img')[0].src = t.editPic.toDataURL();
            }
            
        }
    },
    handleFiles: function() {
        var fileList = this.files[0];
        var oFReader = new FileReader();
        oFReader.readAsDataURL(fileList);
        oFReader.onload = function (oFREvent) { //当读取操作成功完成时调用.
            postFile.paintImage(oFREvent.target.result);//把预览图片URL传给函数
        };
    },
    paintImage: function(url) {
        var t = this;
        var createCanvas = t.getImage.getContext("2d");
        var img = new Image();
        img.src = url;
        img.onload = function(){

            //等比例缩放图片(如果图片宽高都比容器小，则绘制的图片宽高 = 原图片的宽高。)
            //如果图片的宽度或者高度比容器大，则宽度或者高度 = 容器的宽度或者高度，另一高度或者宽度则等比例缩放
            //t.imgWidth：绘制后图片的宽度；t.imgHeight：绘制后图片的高度；t.px：绘制后图片的X轴；t.py：绘制后图片的Y轴
            if ( img.width < t.regional.offsetWidth && img.height < t.regional.offsetHeight) {
                t.imgWidth = img.width;
                t.imgHeight = img.height;

            } else {
                var pWidth = img.width / (img.height / t.regional.offsetHeight);
                var pHeight = img.height / (img.width / t.regional.offsetWidth);
                t.imgWidth = img.width > img.height ? t.regional.offsetWidth : pWidth;
                t.imgHeight = img.height > img.width ? t.regional.offsetHeight : pHeight;
            }
            //图片的坐标
            t.px = (t.regional.offsetWidth - t.imgWidth) / 2 + 'px';
            t.py = (t.regional.offsetHeight - t.imgHeight) / 2 + 'px';
            
            t.getImage.height = t.imgHeight;
            t.getImage.width = t.imgWidth;
            t.getImage.style.left = t.px;
            t.getImage.style.top = t.py;

            createCanvas.drawImage(img,0,0,t.imgWidth,t.imgHeight);//没用直接插入背景图片而用canvas绘制图片，是为了调整所需框内图片的大小
            t.imgUrl = t.getImage.toDataURL();//储存canvas绘制的图片地址
            t.cutImage(); 
            t.drag();
        };
    },
    cutImage: function() {
        var t = this;

        //绘制遮罩层：
        t.editBox.height = t.imgHeight;
        t.editBox.width = t.imgWidth;
        t.editBox.style.display = 'block';
        t.editBox.style.left = t.px;
        t.editBox.style.top = t.py;

        var cover = t.editBox.getContext("2d");
        cover.fillStyle = "rgba(0, 0, 0, 0.5)";
        cover.fillRect (0,0, t.imgWidth, t.imgHeight);
        cover.clearRect(t.sx, t.sy, t.sHeight, t.sWidth);

        document.getElementById('show_edit').style.background = 'url(' + t.imgUrl + ')' + -t.sx + 'px ' + -t.sy + 'px no-repeat';
        document.getElementById('show_edit').style.height = t.sHeight + 'px';
        document.getElementById('show_edit').style.width = t.sWidth + 'px';
    },
    drag: function() {
        var t = this;
        var draging = false;
        var startX = 0;
        var startY = 0;

        document.getElementById('cover_box').onmousemove = function(e) {
            //获取鼠标到背景图片的距离
            var pageX = e.pageX - ( t.regional.offsetLeft + this.offsetLeft );
            var pageY = e.pageY - ( t.regional.offsetTop + this.offsetTop );
            //判断鼠标是否在裁剪区域里面：
            if ( pageX > t.sx && pageX < t.sx + t.sWidth && pageY > t.sy && pageY < t.sy + t.sHeight ) {
                this.style.cursor = 'move';
                
                this.onmousedown = function(){
                    draging = true;
                    //记录上一次截图的坐标
                    t.ex = t.sx; 
                    t.ey = t.sy;
                    //记录鼠标按下时候的坐标
                    startX = e.pageX - ( t.regional.offsetLeft + this.offsetLeft );
                    startY = e.pageY - ( t.regional.offsetTop + this.offsetTop );
                }
                window.onmouseup = function() {
                    draging = false;
                }
                if (draging) {
                    //移动时裁剪区域的坐标 = 上次记录的定位 + (当前鼠标的位置 - 按下鼠标的位置)，裁剪区域不能超出遮罩层的区域;
                    if ( t.ex + (pageX - startX) < 0 ) {
                        t.sx = 0;
                    } else if ( t.ex + (pageX - startX) + t.sWidth > t.imgWidth) {
                        t.sx = t.imgWidth - t.sWidth;
                    } else {
                        t.sx = t.ex + (pageX - startX);
                    };

                    if (t.ey + (pageY - startY) < 0) {
                        t.sy = 0;
                    } else if ( t.ey + (pageY - startY) + t.sHeight > t.imgHeight ) {
                        t.sy = t.imgHeight - t.sHeight;
                    } else {
                        t.sy = t.ey + (pageY - startY);
                    }

                    t.cutImage();
                }
            } else{
                this.style.cursor = 'auto';
            }
        };
    }
}

postFile.init();