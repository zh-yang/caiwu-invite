<template>
    <div class="invite-bind">
        <div id="toast" class="pos-f text-center">{{toastText}}</div>
        <div class="wrap">
            <div class="banner">
            </div>
            <div class="act-panel panel-1">
            </div>
            <div class="act-panel panel-2">
            </div>
            <div class="act-panel panel-3">
            </div>
            <div class="act-panel panel-4">
            </div>
            <div class="act-panel panel-5">
            </div>
            <div class="act-panel panel-6">
            </div>
            <div class="act-panel panel-7 text-center">
              <div class="corner">升级版福利</div>
              <p class="intro">￥<span class="font-bold">666元</span>/年<span class="font-weak">（原价:￥<span class="font-through">999</span>）</span> <span class="font-red">邀请2人返全额现金</span></p>
              <input class="wangwang-input text-center" type="text" v-model="targetSellerNick" placeholder="请输入您的旺旺昵称">
              <p class="topic">
                来自好友
                <span class="name">{{nickName}}</span>
                的邀请
              </p>
              <div class="btn-bind" @click="bindInvite()">抢优惠福利（限量）</div>
            </div>
            <img class="act-panel panel-8" src="../assets/images/inviteBind/panel8.png">
        </div>
        <div id="scroll-bottom" class="pos-f"></div>
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
                      link: 'http://caiwu.cuxiao.quannengzhanggui.net/mobile/bind?inviteNo='+_this.inviteNo+"&nick=" + encodeURI(_this.nick), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                      imgUrl: 'https://wxllb.image.alimmdn.com/qnzg_material/bab4a7d0-b39a-4ce7-8ffe-1bcad634c024', // 分享图标
                      success: function (e) {
                      },
                      fail: function(e){
                      }
                  });

                  wx.onMenuShareTimeline({
                      title: '网店财务管理，首选全能财务，只需一个财务1/6的月薪，为您服务一年！', // 分享标题
                      img_width: 640,
                      img_height: 640,
                      link: 'http://caiwu.cuxiao.quannengzhanggui.net/mobile/bind?inviteNo='+_this.inviteNo+"&nick=" + encodeURI(_this.nick), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                      imgUrl: 'https://wxllb.image.alimmdn.com/qnzg_material/bab4a7d0-b39a-4ce7-8ffe-1bcad634c024', // 分享图标
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

        var $scrollBottom = $('#scroll-bottom');
        var height = document.getElementsByTagName('BODY')[0].scrollHeight;
        var c_height = document.documentElement.clientHeight;
        $(window).scroll(function () {
          var timer;
          if(timer){
            clearTimeout(timer);
          }
            timer = setTimeout(function(){
              if ($(window).scrollTop() > (height -c_height - 200)) {
                $scrollBottom.fadeOut(1000);
            } else {
                $scrollBottom.fadeIn(1000);
            }
            },500);
        });

        $scrollBottom.click(function(){
          // $(document).scrollTop(height -c_height);
          $('html,body').animate({scrollTop:(height -c_height)});
        });

      }
}
</script>