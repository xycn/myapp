/**
 * Created by tach on 2015/12/7.
 */

var menuTouchLayer = cc.Layer.extend({

    ctor : function(){

        this._super();

        this.playMusic();

        this.initMenu();

    },
    sprite:null,
    playMusic : function(){

//        播放背景音乐，true代表循环无限次播放，false表示只播放一次。
        if (GC.SOUND_ON){
            if (cc.audioEngine.isMusicPlaying()){
                return;
            }
            cc.audioEngine.playMusic(res.mm_bgMusic_mp3, true);
        }
    },
    addActionDemo:function(){
        //if (this.isPlaying != true) {
        ///////////////动画开始//////////////////////
        var animation = new cc.Animation();
        for (var i = 1; i <= 7; i++) {
            var frameName = "image"+(i+546)+".png";
            console.log(frameName);
            cc.log("frameName = " + frameName);
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
            animation.addSpriteFrame(spriteFrame);
        }
        animation.setDelayPerUnit(0.2);           //设置两个帧播放时间
        animation.setRestoreOriginalFrame(true);    //动画执行后还原初始状态

        var action = cc.animate(animation);
        this.sprite.runAction(action);
    },
    initMenu : function(){

        this.sprite = new cc.Sprite("#image550.png");
        this.sprite.x = 50;
        this.sprite.y = 50;
        this.addChild(this.sprite);

        var flare = new cc.Sprite(res.mm_flare_jpg);

//        设置flare 为不可见
        flare.visible = false;
        this.addChild(flare, 10);

//        根据rect区域去创建一个精灵，作为下面menuItemSprite显示的图片。
//        因为menuItem有Normal、Selected、Disabled三个状态，所以一个菜单项需要三张纹理图片
        var newGameNormal = new cc.Sprite(res.menu, cc.rect(0, 0, 126, 33));
        var newGameSelected = new cc.Sprite(res.menu, cc.rect(0, 33, 126, 33));
        var newGameDisabled = new cc.Sprite(res.menu, cc.rect(0, 33 * 2, 126, 33));

        var gameSettingsNormal = new cc.Sprite(res.menu, cc.rect(126, 0, 126, 33));
        var gameSettingsSelected = new cc.Sprite(res.menu, cc.rect(126, 33, 126, 33));
        var gameSettingsDisabled = new cc.Sprite(res.menu, cc.rect(126, 33 * 2, 126, 33));

        var aboutNormal = new cc.Sprite(res.menu, cc.rect(252, 0, 126, 33));
        var aboutSelected = new cc.Sprite(res.menu, cc.rect(252, 33, 126, 33));
        var aboutDisabled = new cc.Sprite(res.menu, cc.rect(252, 33 * 2, 126, 33));

//        三个菜单项，并且指定菜单项点击所会执行的函数
        var newGame = new cc.MenuItemSprite(
            newGameNormal,
            newGameSelected,
            newGameDisabled,
            function(){
                this.onNewGame();
                //this.flareEffect(flare, this, this.onNewGame);
            }.bind(this)
        );

        var gameSettings = new cc.MenuItemSprite(
            gameSettingsNormal,
            gameSettingsSelected,
            gameSettingsDisabled,
            this.onSettings,
            this
        );

        var about = new cc.MenuItemSprite(
            aboutNormal,
            aboutSelected,
            aboutDisabled,
            this.onAbout,
            this
        );

//        菜单。对应三者关系：菜单里面有菜单项，菜单项中绑定要执行的方法，并且需要图片去显示。图片就是精灵
        var menu = new cc.Menu(newGame, gameSettings, about);
        menu.alignItemsVerticallyWithPadding(10);
        menu.x = GC.w_2;
        menu.y = GC.h_2 - 80;
        this.addChild(menu, 1, 2);
    },
    onNewGame : function(){
        cc.log("sssssss");
        cc.audioEngine.stopMusic();
        this.addActionDemo();
//        场景切换，并且指定切换效果，更多效果，参考引擎包samples/js-tests下的Transitions Test
//        cc.director.runScene(new cc.TransitionFade(1.2, new GamePlayScene()));
    },
    onSettings : function(){
        this.onButtonEffect();
        //cc.director.runScene(new cc.TransitionFade(1.2, new SettingScene()));
    },
    onAbout : function(){
        this.onButtonEffect();
        //cc.director.runScene(new cc.TransitionFade(1.2, new AboutScene()));
    },
    onButtonEffect : function(){
        if (GC.SOUND_ON) {
            cc.audioEngine.playEffect(res.mm_btnEffect);
        }
    },
    flareEffect : function(flare,target, callback){
        flare.stopAllActions();

//        设置flare 的渲染混合模式
        flare.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
        flare.attr({
            x: -30,
            y: 297,
            visible: true,
            opacity: 0,
            rotation: -120,
            scale: 0.2
        });


//        定义动作
        var opacityAnim = cc.fadeIn(0.5, 255);
        var opacDim = cc.fadeIn(1, 0);

//        为动作加上easing效果，具体参考tests里面的示例
        var biggerEase = cc.scaleBy(0.7, 1.2, 1.2).easing(cc.easeSineOut());
        var easeMove = cc.moveBy(0.5, cc.p(328, 0)).easing(cc.easeSineOut());
        var rotateEase = cc.rotateBy(2.5, 90).easing(cc.easeExponentialOut());
        var bigger = cc.scaleTo(0.5, 1);

//        函数回调动作
        var onComplete = cc.callFunc(callback, target);
        var killflare = cc.callFunc(function () {
            this.getParent().removeChild(this,true);
        }, flare);

//        按顺序执行一组动作
        var seqAction = cc.sequence(opacityAnim, biggerEase, opacDim, killflare, onComplete);

//        同时执行一组动作
        var action = cc.spawn(seqAction, easeMove, rotateEase, bigger);
        flare.runAction(action);
    }
});