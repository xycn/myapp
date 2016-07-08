/**
 * Created by tach on 2015/12/13.
 */

var actionDemoLayer=cc.Layer.extend({
    ctor:function(){
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.enemy_plist);
        this.init();
    },
    isPlaying:null,
    init:function(){
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
                //////////////////动画结束///////////////////
                //this.isPlaying = true;

            //} else {
            //    //this.sprite.stopAllActions();
            //    this.isPlaying = false;
            //}
        }
})
