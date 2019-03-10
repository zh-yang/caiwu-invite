<template>
    <div class="invite-bind">
        <div class="backdrop" @click="retractDrop" v-if="showBackdrop"></div>
        <img v-if="showShareGuide" style="width:4.14rem;height: 2.3rem;" src="../assets/images/invite/share-guide2.png" class="share-guide">
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
            <div class="act-panel panel-7 text-center pos-f" style="height: 1.8rem;width: 7.5rem;border-radius: 0;bottom: 0;left: 0;margin: 0;box-shadow: 0 -5px 10px #ccc;">
              <p class="intro" style="padding-top: 0.15rem;">￥<span class="font-bold">666元</span>/年<span class="font-weak">（原价:￥<span class="font-through">999</span>）</span> <span class="font-red">邀请2人返全额现金</span></p>
              
              <div class="btn-bind" @click="toogleShareGuide(true)">抢内测优惠（限量）</div>
            </div>
            <img style="margin: 0.2rem 0 1.8rem;" class="act-panel panel-8" src="../assets/images/inviteBind/panel8.png">
            </img>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    data() {
        return {
            showBackdrop: false,
            showShareGuide: false
        }
    },
    methods: {
        toogleShareGuide(show) {
            this.showBackdrop = show;
            this.showShareGuide = show;
        },
        retractDrop() {
            this.showBackdrop = false;
            this.showShareGuide = false;
        }
    },
      created() {
        var _this = this;

        var is_weixin = function() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }
        }
        if(is_weixin()){
            getWxOpts();
        }else{
            location.href = 'https://fuwu.taobao.com/ser/detail.htm?spm=a1z13.8114210.1234-fwlb.4.104d5aca6A0xXc&service_code=FW_GOODS-1000402815&tracelog=search&from_key=%E5%85%A8%E8%83%BD%E8%B4%A2%E5%8A%A1';
        }

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
                //   debug: true,
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
                      link: 'http://www.quannengcaiwu.com/mobile/pure', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
                      link: 'http://www.quannengcaiwu.com/mobile/pure', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
      },
      mounted() {
        document.querySelector('head title').innerText = '网店财务管理，首选全能财务，只需一个财务1/6的月薪，为您服务一年！';

      }
}
</script>