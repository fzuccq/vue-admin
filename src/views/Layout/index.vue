<template>
  <div id="layout">
    <layoutheader></layoutheader>
    <layoutmain></layoutmain>
    <layoutnav></layoutnav>
  </div>
</template>
<script>
import layoutheader from './Components/Header';
import layoutmain from './Components/Main';
import layoutnav from './Components/Nav';

export default {
  name:"layout",
  components:{layoutheader,layoutmain,layoutnav},
  setup(){

  }

}
</script>
<style lang="scss" scoped>
 
</style>