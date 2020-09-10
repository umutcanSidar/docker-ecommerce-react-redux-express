import {
  GET_ONE_USER_REQUEST,
  GET_ONE_USER_SUCCESS,
  GET_ONE_USER_FAIL,
} from "../constans/userConstans";

function userOperationReducer(state = {}, action) {
  switch (action.type) {
    case GET_ONE_USER_REQUEST:
      return {
        loading: true,
      };
    case GET_ONE_USER_SUCCESS:
      return {
        loading: false,
        getUserByOne: action.payload,
      };
    case GET_ONE_USER_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
}

export { userOperationReducer };
