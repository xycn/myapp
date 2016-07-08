
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                alert("你点我了")
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("你好，小哈", "Microsoft yahei", 40);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);
        // add "HelloWorld" splash screen"
        cc.log(res)
        this.sprite = new cc.Sprite(res.shuangxin);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);

        this.sprite.runAction(
            cc.sequence(
                cc.rotateTo(2, 0),
                cc.scaleTo(4, 2, 2)
            )
        );
        helloLabel.runAction(
            cc.spawn(
                cc.moveBy(2.5, cc.p(0, size.height - 40)),
                cc.tintTo(2.5,255,125,0)
            )
        );
         var ainio = new cc.LabelTTF("爱你哦，么么哒~", "Microsoft yahei", 40);
         ainio.attr({
            x:size.width/2,
            y:size.height/2,
            color:'#000'
         })
         this.addChild(ainio,5);
        var arrowAction = cc.repeatForever(
            cc.sequence(
                cc.spawn(
                        cc.moveTo(0.8, cc.p(ainio.x, ainio.y + 30)).easing(cc.easeIn(0.5)), 
                        cc.fadeOut(1)
                       ), 
                cc.delayTime(0.8), 
                cc.callFunc(function () {
                        ainio.y = ainio.y - 30;
                        ainio.opacity = 255;
                }, this)
                ));
        ainio.runAction(arrowAction);
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

