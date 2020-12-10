<template>
  <div id="main-wrap">
    <div class="content">
      <router-view />
    </div>
    
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
  @import "../../../styles/config.scss";
  #main-wrap {
    width:100%;
    height:100vh;
    padding-top:$headerHeight+30;
    padding-left:$navmenuWidth+30;
    padding-right:30px;
    @include webkit(box-sizing,border-box);
    @include webkit(transition,all .3s ease 0s);
  }

  .open {
    #main-wrap {
      padding-left:$navmenuWidth+30;
    }
  }

  .close {
    #main-wrap {
      padding-left:$navmenuMin+30;
    }
  }

  .content {
    width:100%;
    height:100%;
    padding:30px;
    background-color: #fff;
    @include webkit(box-sizing,border-box);
  }
</style>