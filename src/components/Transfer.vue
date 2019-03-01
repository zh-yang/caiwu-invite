<template>
  <div class="invite-transfer">
    <div class="backdrop" @click="retractDrop" v-if="showBackdrop"></div>
    <img v-if="showShareGuide" src="../assets/images/inviteBind/share-guide.png" class="share-guide">
    <img class="icon-success" src="../assets/images/inviteBind/icon-success.png" alt="">
    <p class="topic">恭喜您成功领取福利！</p>
    <p class="intro">在浏览器中打开，进行软件订购</p>
    <div class="btn-browser" @click="toogleShareGuide(true)">打开浏览器</div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      showBackdrop: false,
      showShareGuide: false,
      is_weixin: null
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
    var is_weixin = function() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    }
    if(is_weixin()){
      this.is_weixin = true;
    }else{
      location.href = 'https://fuwu.taobao.com/ser/detail.htm?spm=a1z13.8114210.1234-fwlb.4.104d5aca6A0xXc&service_code=FW_GOODS-1000402815&tracelog=search&from_key=%E5%85%A8%E8%83%BD%E8%B4%A2%E5%8A%A1';
    }
    

  },
  mounted() {
    document.querySelector('head title').innerText = '网店财务管理，首选全能财务，只需一个财务1/6的月薪，为您服务一年！';
    var _this = this;
    if(_this.is_weixin){
      _this.toogleShareGuide(true);
    }

  }
}

</script>
