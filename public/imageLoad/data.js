
var News=function(){};
var result;
News.prototype={
    getTitlePre:function (){
       return ;
    },

    getBody: function () {
        var data = {
            body: '<p>　　新华网巴西福塔莱萨7月14日电 当地时间7月14日，国家主席习近平在巴西福塔莱萨会见印度总理莫迪。</p><!--IMG#0-->  <img id="topic_img_0" alt=""  src="http://img1.cache.netease.com/catchpic/2/21/2175917F8227D26D07826AFD920056C9.jpg"  data-src="http://img1.cache.netease.com/catchpic/2/21/2175917F8227D26D07826AFD920056C9.jpg"  />'
            + ' <p>　　习近平表示，中印作为两个最大发展中国家和新兴市场国家，都处在实现民族复兴的伟大历史进程中，最珍惜的就是和平与发展，两国的理想和目标息息相通。印中都是世界重要一极，拥有许多战略契合点。中印用一个声音说话，全世界都会倾听。中印携手合作，全世界都会关注。无论从双边、地区还是全球层面看，中印都是长久战略合作伙伴，而非竞争对手。携手实现和平发展、合作发展、包容发展，让两国25亿人民过上更好的生活，为地区乃至世界增加和平与发展的力量，是我们最大共同利益所在。我愿意同莫迪总理一道，将中印战略合作伙伴关系不断提高到更高水平，共同维护我们的战略机遇期，维护亚洲乃至世界和平稳定。</p>'
                 + '     <!--IMG#1--><img id="topic_img_1" alt=""  data-src="http://img1.cache.netease.com/catchpic/1/10/104DEE3526324F6FB3F834EFA4D5E7CE.jpg"  src="http://img1.cache.netease.com/catchpic/1/10/104DEE3526324F6FB3F834EFA4D5E7CE.jpg" />'
        + '  <p>　　莫迪表示，我就任总理后，习近平主席即派王毅外长作为特使访问印度，体现了中方对发展两国关系的高度重视。前不久，印度、中国、缅甸共同举办和平共处五项原则发表60周年纪念活动，习近平主席发表的重要讲话给我留下深刻印象。我任古吉拉特邦首席部长期间多次访华，我亲身感受到中国人民对印度人民的友好感情。我领导的印度新政府愿深化印中友好合作关系，这对印度非常重要。我愿意同习近平主席保持密切良好的工作联系，欢迎习近平主席在不久的将来对印度进行国事访问，我愿意在方便的时候访华。印中都是文明古国，两国文化交流源远流长，我们两个民族是一种精神、两个身体，我们要增进相互理解，发挥两国智慧，在国际上共同弘扬和平、包容的精神，携手应对全球性问题和挑战。印中和睦相处、共同发展，对世界和人类是重大贡献。</p>'
   + ' <!--IMG#4--><img id="topic_img_2" alt=""  data-src="http://img1.cache.netease.com/catchpic/5/5A/5ACECC8734AF536F026F6FC7ACFA6E4D.jpg"   src="http://img1.cache.netease.com/catchpic/5/5A/5ACECC8734AF536F026F6FC7ACFA6E4D.jpg" />'
            + ' <p>　　王沪宁、栗战书、杨洁篪等参加会见。</p>'
        };


    //      <p>　　去美国芝加哥这家热狗店，也是个好主意。这家店以凶悍的服务态度出名，里面的店员各个凶神恶煞，清一色是黑人，对待客人都是大吼小叫，不把客人当人看。正因为如此，这变成了他们家的卖点，许多客人因此慕名去挨骂。</p>
    //      <!--IMG#5--><img id='topic_img_5' alt='' src='http://img2.cache.netease.com/2008/2013/5/31/20130531174349e1870.jpg' />
    //      <p>　　付钱被骂，美帝人民，我服了YOU！</p>
    //      <!--IMG#6--><img id='topic_img_6' alt='' src='http://img2.cache.netease.com/2008/2013/5/31/201305311713064d121.jpg' />
    //      <p>　　发了工资，看看电影也不错，“西洋剧”如何？（请务必注意不要联想同音字）</p>
    //      <!--IMG#7--><img id='topic_img_7' alt='' src='http://img3.cache.netease.com/2008/2013/5/31/201305311713329196a' />
    //      <p>　　同音字这事情最坏了，毁掉了我心目中不少歌词。（图：一起神回复）</p>
    //      <!--IMG#8--><img id='topic_img_8' alt='' src='http://img3.cache.netease.com/2008/2013/5/31/20130531171428cf643.jpg' />
    //      <!--IMG#9--><img id='topic_img_9' alt='' src='http://img3.cache.netease.com/2008/2013/5/31/2013053117143008c3e.jpg' />
    //      <p>　　无论你信不信，小编绝对是个有信用、记性又很好的人。5月31日是吧，我5月26日就看到了。</p>
    //<!--IMG#10--><img id='topic_img_10' alt='' src='http://img6.cache.netease.com/2008/2013/5/31/20130531171456ac341.jpg' />
    //      <p>　　不过那位W姓的小编可能会挺害怕的，大家别这样吓他嘛。</p><!--IMG#11--><p>　　这位易友说，他看不懂抽烟的人的逻辑，坦白说：我也不懂。</p>"

        return data;
    },
    getCommentText:function(){},
    getTitle:function(){
        return '习近平会见印度总理莫迪 谈及边境问题';
   },
    getSource:function(){
        return 'MBA俱乐部';
    },
    getTime:function(){
        return '1小时前';
    },
    getLabel:function(){
        return '科技 · 重要';
    }

};
