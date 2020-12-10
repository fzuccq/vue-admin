<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="toggleCollapse()">
      <svg-icon iconClass="menu" className="menu" />
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">{{username}}</div>
      <div class="header-icon pull-left" @click="exit"><svg-icon iconClass="exit" className="exit" /></div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
export default {
  name:"layoutHeader",
  setup(props,{root}){
    const username=computed(()=>root.$store.state.app.username);
    console.log(username);
    const toggleCollapse=(()=>{
      root.$store.commit("app/setCollapse");
      console.log(root.$store.state.app.isCollapse);
    });
    const exit=(()=>{
      root.$store.dispatch("app/userExit").then(response=>{
        root.$router.push({name:"Login"});
      }).catch(error=>{
        console.log(error);
      });
    })

    return {
      username,
      toggleCollapse,
      exit
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../styles/config.scss";
  #header-wrap {
    position: fixed;
    top:0;
    left:$navmenuWidth;
    right:0;
    height: $headerHeight;
    line-height: $headerHeight;
    background-color: #fff;
    @include webkit(box-shadow,0 3px 16px 0 rgba(0,0,0,.1));
    @include webkit(transition,all .3s ease 0s);
  }

  .header-icon {
    padding:0 25px;
    svg {
      margin-bottom: -8px;
      font-size:25px;
      cursor: pointer;
    }
  }

  .open {
    #header-wrap {
      left:$navmenuWidth;
    }
  }

  .close {
    #header-wrap {
      left:$navmenuMin;
    }
  }

  .user-info {
    height:100%;
    padding:0 32px;
    border-right: 1px solid #ededed;
  }
</style>