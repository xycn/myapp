
// 定义一个层，继承自cc.Layer
var MainMenuLayer = cc.Layer.extend({

//    属性声明
    _backgroundLayer : null,
    _touchLayer      : null,
    ctor : function(){

//        调用父类ctor方法。结合下面MainMenuScene中的onEnter 可以得出：this._super() 调用父类当前方法。
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.enemy_plist);
        //this.addBackgroundLayer();

        this.addTouchLayer();

        //var demo=new actionDemoLayer();
        //this.addChild(demo,10);
        //this.addActionDemo();
    },

//    定义方法
    addBackgroundLayer : function(){
//        创建一个背景层，并且添加到当前层中
        this._backgroundLayer = new menuBgLayer();
        this.addChild(this._backgroundLayer);
    },
    addTouchLayer : function(){
        this._touchLayer = new menuTouchLayer();
        this.addChild(this._touchLayer);
    },
    addActionDemo:function(){
        this.sprite = new cc.Sprite("#image547.png");
        this.sprite.x = 50;
        this.sprite.y = 50;
        this.addChild(this.sprite);
        //if (this.isPlaying != true) {
        ///////////////动画开始//////////////////////
        var animation = new cc.Animation();
        for (var i = 1; i <= 6; i++) {

            var frameName = "image54"+(i+6)+".png";
            cc.log("frameName = " + frameName);
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
            animation.addSpriteFrame(spriteFrame);
        }
        animation.setDelayPerUnit(0.15);           //设置两个帧播放时间
        //animation.setRestoreOriginalFrame(true);    //动画执行后还原初始状态

        var action = cc.animate(animation);
        this.sprite.runAction(cc.repeatForever(action));
    }
});

// 定义一个场景，继承自cc.Scene
var MainMenuScene  = cc.Scene.extend({
    onEnter:function () {
//        调用父类的onEnter()方法。
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
    }
});