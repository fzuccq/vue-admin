<template>
  <div id="nav-wrap">
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
            <i class="el-icon-location"></i>
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
    const isCollapse = ref(false);
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
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navmenuWidth;
  height: 100vh;
  background-color: #344a5f;
}
</style>