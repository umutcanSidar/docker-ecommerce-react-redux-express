import Cookie from "js-cookie";

export const isLogin = () => {
  if (Cookie.getJSON("userInfo")) {
    return true;
  }
  return false;
};
