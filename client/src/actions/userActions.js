import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  USER_LOGOUT,
} from "../constans/userConstans";

import Axios from "axios";
import Cookie from "js-cookie";

const signIn = (auth) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST, payload: auth });
    const { data } = await Axios.post(
      "http://127.0.0.1:3000/v1/auth/login",
      auth
    );
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: LOGIN_USER_FAIL, payload: error.response.data });
  }
};

const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  Cookie.remove("userInfo");
};

export { signIn, logout };
