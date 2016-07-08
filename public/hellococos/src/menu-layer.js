var menuLayer=cc.Layer.extend({
	sprite:null,
	ctor:function(){
		this._super();
        // this._super(cc.color(255, 255, 0, 0));
        // this._super(new cc.Sprite(res.bg1));
        var winWidth=cc.winSize.width;
        var winHeight=cc.winSize.height;
        var bg=new cc.Sprite(res.bg);
        // bg.width=winWidth;
        // bg.height=winHeight;
        bg.attr({
                anchorX : 0.5,
                anchorY : 0.5,
                x: winWidth/2,
                y: winHeight/2
        })
        this.addChild(bg,-1);
        var logo=new cc.Sprite(res.logo);
        logo.attr({
        	x:winWidth/2,
        	y:winHeight-100
        })
        this.addChild(logo,2);

        var start=new cc.Sprite(res.start);
        start.attr({
        	x:winWidth/2,
        	y:120
        })
        this.addChild(start,2);

        var setting=new cc.Sprite(res.setting);
        setting.attr({
        	x:winWidth/2,
        	y:60
        })
        this.addChild(setting,2);
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
                    cc.director.runScene(new cc.TransitionRotoZoom(2,new settingScence()))
                    return true;
                }
                return false;
            }            
        }, setting);
	}
})
var menuSence=cc.Scene.extend({
	onEnter:function(){
		this._super();
		this.addChild(new menuLayer());
	}
})
