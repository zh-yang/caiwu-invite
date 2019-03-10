<template>
    <div class="invite-act">
        <div class="backdrop" @click="retractDrop" v-if="showBackdrop"></div>
        <div class="act-rule" @click="toogleActRule(true)">活动规则&nbsp;</div>
        <div class="rule-list" v-if="showRuleList">
            <div class="wrap">
                <p>邀请规则</p>
                <img @click="toogleActRule(false)" src="../assets/images/invite/close.png" alt="" class="close">
                <ul>
                    <li>1、邀请人每成功邀请1位好友，即可获得333元现金奖励，以此类推，多邀多得；成功邀请2位及以上好友，可支持提现，提现支付宝；</li>
                    <li>2、被邀请好友必须是新用户（从未付费订购过全能财务的用户），否则视为无效邀请；</li>
                    <li>3、如果被邀请好友订购后申请了退款，则平台会扣除此部分返利；</li>
                    <li>4、邀请成功后您可获得相应的现金奖励；申请提现请从电脑端登录全能财务并绑定支付宝账号，奖励将直接发放到您绑定的支付宝账号内；</li>
                    <li>5、如发现违规作弊行为，全能财务有权取消邀请人的活动参与资格，并收回奖励。</li>
                </ul>
            </div>
        </div>
        <img v-if="showShareGuide" src="../assets/images/invite/share-guide.png" class="share-guide">
        <!-- page -->
        <div class="page-wrap">
            <div class="banner pos-r">
                <p class="topic text-center pos-a">
                    限时优惠<span>666元/年</span>&nbsp;&nbsp;邀请<span>2人</span>免费用
                </p>
            </div>
            <div class="act-panel panel-1 text-center pos-r">
                <img class="title" src="../assets/images/invite/title_panel1.png" alt="">
                <p class="intro">好友订购 仅需666</p>
                <div class="panel-bg">
                    <p class="topic">立省333元</p>
                    <p class="price-present">
                        <span>￥</span>666<span>/全年</span>
                    </p>
                    <p class="price-original">原价：999元</p>
                    <p class="remake">内测期间 不限订单量</p>
                </div>
            </div>
            <div class="act-panel panel-2 pos-r">
                <img class="title" src="../assets/images/invite/title_panel2.png" alt="">
                <p class="intro text-center">邀请返现 上不封顶</p>
                <ul class="wrap">
                    <li>
                        <ul class="list">
                            <li>达成操作</li>
                            <li style="padding-left: 0.7rem;">获得奖励</li>
                            <li>价值</li>
                        </ul>
                    </li>
                    <li>
                        <ul class="list">
                            <li>邀请1人</li>
                            <li>现金333元</li>
                            <li>1/3订购价</li>
                        </ul>
                    </li>
                    <li>
                        <ul class="list">
                            <li>邀请2人</li>
                            <li>现金666元</li>
                            <li>软件免费</li>
                        </ul>
                    </li>
                    <li>
                        <ul class="list">
                            <li>邀请3人</li>
                            <li>现金999元</li>
                            <li class="double">
                                <p>软件免费</p>
                                <p>+送333元现金</p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul class="list">
                            <li>……</li>
                            <li>现金奖励 上不封顶</li>
                        </ul>
                    </li>
                </ul>
                <img class="corner pos-a" src="../assets/images/invite/corner.png">
            </div>
        </div>
        <div class="btn-invite text-center pos-f" @click="toogleShareGuide(true)">立即邀请好友</div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    data() {
        return {
            showBackdrop: false,
            showRuleList: false,
            showShareGuide: false,
            inviteNo: null,
            nick: null,
            nickName: null
        }
    },
    methods: {
        toogleActRule(show) {
            this.showBackdrop = show;
            this.showRuleList = show;
        },
        toogleShareGuide(show) {
            this.showBackdrop = show;
            this.showShareGuide = show;
        },
        retractDrop() {
            this.showBackdrop = false;
            this.showShareGuide = false;
            this.showRuleList = false;
        }
    },
      created() {
        var _this = this;

        this.inviteNo = this.$route.query.inviteNo;
        this.nick = this.$route.query.nick;
        

        getWxOpts();
        function getWxOpts() {
          $.ajax({
            // url: '/ba/facade/wechat-sign/sign',
            url: '/facade/wechat-sign/sign',
            data: JSON.stringify({ url: window.location.href.split('#')[0]}),
            type: "post",
            dataType: "json",
            contentType: "application/json; charset=utf-8", 
            success: function(data) {
              // alert(JSON.stringify(data))
              if (data) {
                wx.config({
                  //debug: true,
                  appId: data.data.appId, // 必填，公众号的唯一标识
                  timestamp: data.data.timestamp, // 必填，生成签名的时间戳 Date.parse(new Date())
                  nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
                  signature: data.data.signature, // 必填，签名，见附录1
                  jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function() {
                  wx.onMenuShareAppMessage({
                      title: '网店财务管理，首选全能财务，只需一个财务1/6的月薪，为您服务一年！', // 分享标题
                      desc: '这款软件精准计算网店利润，数据报表可视化，自动同步直通车/钻展数据，更可一键批量操作成本、库存！快来一起体验！',
                      img_width: 640,
                      img_height: 640,
                      link: 'http://www.quannengcaiwu.com/mobile/bind?inviteNo='+_this.inviteNo+"&nick=" + encodeURI(_this.nick), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                      imgUrl: 'https://wxllb.image.alimmdn.com/qnzg_material/bab4a7d0-b39a-4ce7-8ffe-1bcad634c024', // 分享图标
                      success: function (e) {
                        _this.toogleShareGuide(false);
                      },
                      fail: function(e){
                      }
                  });

                  wx.onMenuShareTimeline({
                      title: '网店财务管理，首选全能财务，只需一个财务1/6的月薪，为您服务一年！', // 分享标题
                      img_width: 640,
                      img_height: 640,
                      link: 'http://www.quannengcaiwu.com/mobile/bind?inviteNo='+_this.inviteNo+"&nick=" + encodeURI(_this.nick), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                      imgUrl: 'https://wxllb.image.alimmdn.com/qnzg_material/bab4a7d0-b39a-4ce7-8ffe-1bcad634c024', // 分享图标
                      success: function (e) {
                        _this.toogleShareGuide(false);
                      },
                      fail: function(e){
                      }
                  })
                })
              }
            }
          })
        }


        
        var decodeNick = decodeURI(this.nick);
        if (decodeNick.length > 6) {
          var arr = decodeNick.split('');
          arr.splice(3, decodeNick.length - 6, '***');
          this.nickName = arr.join('');
        } else {
          this.nickName = decodeURI(this.nick);
        }

        
      },
      mounted() {
        document.querySelector('head title').innerText = '网店财务管理，首选全能财务，只需一个财务1/6的月薪，为您服务一年！';
      }
}
</script>