<template>
  <div id="header-wrap">头部</div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
  #header-wrap {
    position: fixed;
    top:0;
    left:$navmenuWidth;
    right:0;
    height: $headerHeight;
    background-color: #fff;
    box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
  }
</style>