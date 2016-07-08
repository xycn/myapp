var settingLayer=cc.Layer.extend({
	sprite:null,
	ctor:function(){
		this._super();
        var winWidth=cc.winSize.width;
        var winHeight=cc.winSize.height;
        var start=new cc.Sprite(res.start);
        start.attr({
        	x:winWidth/2,
        	y:200
        })
        this.addChild(start,1);

        var setting=new cc.Sprite(res.setting);
        setting.attr({
        	x:winWidth/2,
        	y:90
        })
        this.addChild(setting,1);
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,//单击
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                var target = event.getCurrentTarget();  // 获取事件所绑定的 target, 通常是cc.Node及其子类 
                cc.log(target);
                // 获取当前触摸点相对于按钮所在的坐标
                var locationInNode = target.convertToNodeSpace(touch.getLocation());    
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {       // 判断触摸点是否在按钮范围内
                    //这里判断点击的区域是按钮
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    target.opacity = 180;
                    cc.director.runScene(new cc.TransitionFlipX(2,new menuSence()))
                    return true;
                }
                return false;
            }            
        }, setting);
	}
})
var settingScence=cc.Scene.extend({
	onEnter:function(){
		this._super();
		this.addChild(new settingLayer());
	}
})