import {
  GET_ONE_USER_REQUEST,
  GET_ONE_USER_SUCCESS,
  GET_ONE_USER_FAIL,
} from "../constans/userConstans";

import Axios from "axios";

const getOneUser = () => async (dispatch, getState) => {
  const {
    login: { userInfo },
  } = getState();
  try {
    dispatch({ type: GET_ONE_USER_REQUEST });
    const { data } = await Axios.get(
      "http://127.0.0.1:3000/v1/users/" + userInfo.userId,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );
    dispatch({ type: GET_ONE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ONE_USER_FAIL, payload: error.message });
  }
};

export { getOneUser };
