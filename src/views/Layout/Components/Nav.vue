<template>
  <div id="nav-wrap">
    <div class="logo">
      <img src="../../../assets/images/logo.png" alt="">
    </div>
    
    <el-menu
      default-active="3"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"/>
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <template v-for="subItem in item.children">
            <el-menu-item
              v-if="!subItem.hidden"
              :key="subItem.id"
              :index="subItem.path"
              >{{ subItem.meta.name }}</el-menu-item
            >
          </template>
        </el-submenu>
      </template>
    </el-menu>
    
  </div>
</template>
<script>

import { reactive, ref, onMounted, computed } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    /**
     * 变量定义区
     */
    // const isCollapse = ref(false);
    const isCollapse = computed(()=>{
      return root.$store.state.app.isCollapse;
    });

    const routers = reactive(root.$router.options.routes);

    /**
     * 函数定义区
     */
    const handleOpen = (key, keyPath) => {};

    const handleClose = (key, keyPath) => {};

    return {
      isCollapse,
      routers,
      handleOpen,
      handleClose,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
.logo {
  text-align: center;
  img {
    margin:20px auto 25px;
    width: 92px;
    @include webkit(transition,all .3s ease 0s);
  }
}
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navmenuWidth;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition,all .3s ease 0s);

  svg {
    font-size: 20px;
    margin-right: 10px;
    color:#fff;
  }
}

.open {
  #nav-wrap {
    width:$navmenuWidth;
  }
}

.close {
  #nav-wrap {
    width:$navmenuMin;
  }

  .logo img {
    width:70%;
  }
}
</style>