var loader = {
    _step: 0,
    add: function (selector) {
        var loader = ['<div class="loader scalemin">',
            '<div class="line-masker two"></div>',
            '<div class="line-masker three"></div>',
            '<div class="line-masker four"></div>',
            '<div class="line-masker five"></div>',
            '<div class="circle"></div></div>'
        ].join('');
        $('#container').append(loader);
        this._step = 1;
        this.$loader = $('.loader');
        this.initEvent();
    },
    open: function (selector) {
        this.add();
        this.$loader.addClass('show');
        this._step = 2;
    },
    close: function () {
        this.$loader.removeClass('loading').addClass('scalemin');
        this._step = 5;
    },
    initEvent: function () {
        var transitionEndCount = 0;
        _this = this;
        _this.$loader.on('animationend', function () {
            var $this = $(this);
            console.log('s:', _this._step)
            if (_this._step = 2) {
                $this.removeClass('show').removeClass('scalemin');
                _this._step = 3;
            } else if (_this._step == 6) {
                _this.$loader.remove();
                _this._step = 7;
            }
        })
        $('.line-masker').on('transitionend', function () {
            if (++transitionEndCount === 6) {
                transitionEndCount = 0;
                if (_this._step == 3) {
                    _this.$loader.addClass('loading');
                    _this._step = 4;
                } else if (_this._step == 5) {
                    console.log('5')
                    _this.$loader.addClass('hide');
                    _this._step = 6;
                } else {}
            } else {
                return false;
            }
        })
    },
    debug: true
}
if (loader.debug) {
    (function (e) {
        e.setAttribute("src", "http://10.58.92.103:1000/target/target-script-min.js#anonymous");
        document.getElementsByTagName("body")[0].appendChild(e);
    })(document.createElement("script"));
}