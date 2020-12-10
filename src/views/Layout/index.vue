<template>
  <div id="layout" :class="[menuStatus?'close':'open']">
    <layoutheader></layoutheader>
    <layoutmain></layoutmain>
    <layoutnav></layoutnav>
  </div>
</template>
<script>
import layoutheader from './Components/Header';
import layoutmain from './Components/Main';
import layoutnav from './Components/Nav';
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
export default {
  name:"layout",
  components:{layoutheader,layoutmain,layoutnav},
  setup(props,{root}){
    const menuStatus=computed(()=> root.$store.state.app.isCollapse);

    return {
      menuStatus
    }
  }

}
</script>
<style lang="scss" scoped>
 
</style>