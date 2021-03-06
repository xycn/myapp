/**
 * Created by tach on 2015/12/7.
 */

var menuBgLayer = cc.Layer.extend({

    _sptBg     : null,
    _sptLogo   : null,
    _ship      : null,
    ctor : function(){

        this._super()

//将plist资源加载到内存中
        cc.spriteFrameCache.addSpriteFrames(res.TextureTransparentPack_plist);

        this.initBackground();

        this.initShip();

        this.initLogo();


    },

    initBackground : function(){

//        创建一个精灵作为背景，并且设置它的锚点为cc.p(0.5, 0.5)[锚点默认为0.5], 以及坐标定位在屏幕中间
        this._sptBg = new cc.Sprite(res.bg);
        this._sptBg.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x: GC.w_2,
            y: GC.h_2
        });
        this.addChild(this._sptBg);
    },

    initLogo : function(){
        this._sptLogo = new cc.Sprite(res.mm_logo_png);
        this._sptLogo.attr({
            x : GC.w_2,
            y : GC.h - 160
        });
        this.addChild(this._sptLogo, 1);
    },
    initShip : function(){

//        (#)号代表从内存中去获取一张纹理(图片)，因为我们前面有把那个plist加载到内存中
        this._ship = new cc.Sprite("#ship01.png");
        this.addChild(this._ship);
        this._ship.x = Math.random() * GC.w;
        this._ship.y = 0;

//        运行一个moveBy类型的动作
        this._ship.runAction(cc.moveBy(2, cc.p(Math.random() * GC.w, this._ship.y + GC.h + 100)));


//        定时器，每隔0.1秒去执行this.update()方法
        this.schedule(this.update, 0.1);

    },
    update:function () {
        if (this._ship.y > 480) {
            this._ship.x = Math.random() * GC.w;
            this._ship.y = 10;
            this._ship.runAction(cc.moveBy(
                parseInt(5 * Math.random(), 10),
                cc.p(Math.random() * GC.w, this._ship.y + 480)
            ));
        }
    }
});