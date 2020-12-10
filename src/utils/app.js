import cookie from "cookie_js";
const adminToken="admin_token";
const userName="username";

export function getTokenCookie(){
  return cookie.get(adminToken);
}

export function setTokenCookie(value){
  return cookie.set(adminToken,value);
}

export function removeTokenCookie(){
  return cookie.remove(adminToken);
}

export function getUserNameCookie(){
  return cookie.get(userName);
}

export function setUserNameCookie(value){
  return cookie.set(userName,value);
}

export function removeUserNameCookie(){
  return cookie.remove(userName);
}