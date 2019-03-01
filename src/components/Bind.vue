<template>
    <div class="invite-bind">
        <div id="toast" class="pos-f text-center">{{toastText}}</div>
        <div class="wrap">
            <div class="banner pos-r">
                <p class="topic text-center pos-a">
                    只需一个财务<span>1/6</span>的月薪 为您服务<span>一年</span>
                </p>
            </div>
            <div class="act-panel panel-1 text-center pos-r">
                <ul class="wrap">
                    <li>
                        <img src="../assets/images/inviteBind/panel1 (2).png" alt="">
                        <p>成本</p>
                        <p>算不准</p>
                    </li>
                    <li>
                        <img src="../assets/images/inviteBind/panel1 (3).png" alt="">
                        <p>报表</p>
                        <p>看不懂</p>
                    </li>
                    <li>
                        <img src="../assets/images/inviteBind/panel1 (4).png" alt="">
                        <p>现金流</p>
                        <p>无预警</p>
                    </li>
                    <li>
                        <img src="../assets/images/inviteBind/panel1 (1).png" alt="">
                        <p>软件</p>
                        <p>不靠谱</p>
                    </li>
                </ul>
            </div>
            <img class="arrow" src="../assets/images/inviteBind/arrow.png">
            <p class="topic text-center">我们轻松帮您解决以上问题</p>
            <div class="act-panel panel-2">
                <img src="../assets/images/inviteBind/panel2.png">
            </div>
            <div class="wechat-code">
                <img src="../assets/images/inviteBind/wechat-code.png" alt="" class="code">
                <ul>
                    <li class="font-34">添加客服微信</li>
                    <li class="font-22">参与全能财务内测！</li>
                    <li class="font-20">长按识别二维码</li>
                </ul>
            </div>


        </div>
        <div class="module-bind text-center pos-f">
            <p class="topic">
                <img src="../assets/images/inviteBind/icon-left.png" alt="" class="icon-left">
                {{nickName}} 邀请您内测啦
                <img src="../assets/images/inviteBind/icon-right.png" alt="" class="icon-right">
            </p>
            <p class="intro">限时优惠<span class="bold">666元/年</span> （原价999） <span>邀请2人免费用</span></p>
            <input class="wangwang-input text-center" type="text" v-model="targetSellerNick" placeholder="输入您的旺旺昵称即可体验">
            <div class="btn-bind" @click="bindInvite()">马上体验</div>
            <img src="../assets/images/inviteBind/corner.png" alt="" class="corner pos-a">
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    data() {
        return {
            isOwn: false,
            showBackdrop: false,
            showRuleList: false,
            showShareGuide: false,
            inviteNo: null,
            nick: null,
            nickName: null,
            targetSellerNick: null,
            locationUrl: null,
            toastText: ''
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
        },
        bindInvite() {
            var _this = this;
            if (_this.targetSellerNick === '' || _this.targetSellerNick === null) {
                _this.toast('请输入您的店铺主旺旺昵称');
                return;
            }

            $.ajax({
                // url: "/ba/facade/invite-money/invite",
                url: "/facade/invite-money/invite",
                type: "put",
                data: JSON.stringify({"invite_code": _this.inviteNo,"invited_nick": _this.targetSellerNick}),
                dataType: "json", //指定服务器返回的数据类型
                contentType: "application/json; charset=utf-8", 
                success: function(data) {
                    if (data.is_success) {
                        if(data.message == 'success'){
                            location.href = location.origin + '/mobile/transfer';
                        }else{
                            _this.toast(data.message);
                            setTimeout(function() {
                                location.href = location.origin + '/mobile/transfer';
                            },1500)
                        }
                        
                        
                    } else {
                        _this.toast(data.message);
                    }
                }
            });
        },
        toast(text) {
            var $toast = $('#toast');
            $toast.hide();
            this.toastText = text;
            $toast.fadeIn(function(){
                setTimeout(function(){$toast.fadeOut(1000)},2000);
            });
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
                  debug: true,
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
                      link: 'http://wx.quannengzhanggui.net/mobile/inviteBind?inviteNo='+_this.inviteNo+"&nick=" + encodeURI(_this.nick), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                      imgUrl: 'https://wxllb.image.alimmdn.com/qnzg_material/4696684d-0a1b-4999-ab2d-9c18b48b2007', // 分享图标
                      success: function (e) {
                      },
                      fail: function(e){
                      }
                  });

                  wx.onMenuShareTimeline({
                      title: '网店财务管理，首选全能财务，只需一个财务1/6的月薪，为您服务一年！', // 分享标题
                      img_width: 640,
                      img_height: 640,
                      link: 'http://wx.quannengzhanggui.net/mobile/inviteBind?inviteNo='+_this.inviteNo+"&nick=" + encodeURI(_this.nick), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                      imgUrl: 'https://wxllb.image.alimmdn.com/qnzg_material/4696684d-0a1b-4999-ab2d-9c18b48b2007', // 分享图标
                      success: function (e) {
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