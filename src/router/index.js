import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden:true,
    meta:{
      name:"首页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden:true,
    component: () => import("../views/Login/index.vue"),
    meta:{
      name:"登录"
    }
  },
  {
    path: "/console",
    name: "Console",
    redirect:"Index",
    meta:{
      name:"控制台"
    },
    component: () => import("../views/Layout/index.vue"),
    children:[{
      path:"/index",
      name:"Index",
      component: () => import("../views/Console/index.vue"),
      meta:{
        name:"首页"
      }
    }]
  },
  {
    path: "/info",
    name: "Info",
    meta:{
      name:"信息管理"
    },
    component: () => import("../views/Layout/index.vue"),
    children:[{
      path:"/infoIndex",
      name:"InfoIndex",
      component: () => import("../views/Info/index.vue"),
      meta:{
        name:"信息列表"
      }
    },{
      path:"/infoCategory",
      name:"InfoCategory",
      component: () => import("../views/Info/category.vue"),
      meta:{
        name:"信息分类"
      }
    }]
  },
  {
    path: "/user",
    name: "User",
    meta:{
      name:"用户管理"
    },
    component: () => import("../views/Layout/index.vue"),
    children:[{
      path:"/userIndex",
      name:"UserIndex",
      component: () => import("../views/User/index.vue"),
      meta:{
        name:"用户列表"
      }
    }]
  }
];

const router = new VueRouter({
  routes,
});

export default router;
