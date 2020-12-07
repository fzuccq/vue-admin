import service from "@/utils/request";

/**
 * 获取验证码
 */
export function getSms(data){
  return service.request({
    method:"post",
    url:"/getSms/",
    data:data
  });
}

/**
 * 用户注册
 */
export function regUser(data){
  return service.request({
    method:"post",
    url:"/register/",
    data:data
  });
}

/**
 * 登录
 */
 export function login(data){
   return service.request({
     method:"post",
     url:"/login/",
     data:data
   });
 }