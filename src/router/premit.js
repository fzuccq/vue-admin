import router from "./index";
import store from "@/store/index";
import {getTokenCookie,removeTokenCookie,removeUserNameCookie} from "@/utils/app";

const whiteRouter=["/login"];
router.beforeEach((to,from,next)=>{
  if(getTokenCookie()){
    if(to.path==="/login"){
      removeTokenCookie();
      removeUserNameCookie();
      store.commit("app/setToken","");
      store.commit("app/setUserName");
      next();
    }else{
      next();
    }
    
  }else{
    if(whiteRouter.indexOf(to.path)!==-1){
      next();
    }else{
      next("/login");
    }
  }
  //next();
});