import { login } from "@/api/login";
import { getUserNameCookie,getTokenCookie,setTokenCookie, setUserNameCookie,removeTokenCookie,removeUserNameCookie } from "@/utils/app";

const state={
  isCollapse:JSON.parse(localStorage.getItem("isCollapse")) || false,
  token:getTokenCookie("admin_token") || '',
  username:getUserNameCookie("username") || ''
};
const getters={
  isCollapse:state=>state.isCollapse,
  username:state=>state.username
};
const mutations={
  setCollapse(state){
    console.log(state);
    state.isCollapse=!state.isCollapse;
    // html5本地存储
    localStorage.setItem("isCollapse",JSON.stringify(state.isCollapse));
  },
  setToken(state,value){
    state.token=value;
    
  },
  setUserName(state,value){
    state.username=value;
  }
}

const actions = {
  userLogin(context, data) {
    return new Promise((resolve, reject) => {
      login(data).then((reponse) => {
          let data = reponse.data.data;
          console.log(context);
          context.commit("setToken", data.token);
          context.commit("setUserName", data.username);
          setTokenCookie(data.token);
          setUserNameCookie(data.username);
          resolve(reponse);
        }).catch((error) => {
          reject(error);
        });
    });
  },

  userExit(context,data){
    return new Promise((resolve,reject)=>{
      removeTokenCookie();
      removeUserNameCookie();
      context.commit("setToken","");
      context.commit("setUserName","");
      return resolve();
    });
    
  }
};

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
};
