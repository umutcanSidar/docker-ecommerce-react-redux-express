import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userReducer";

import Cookie from "js-cookie";
import { userOperationReducer } from "./reducers/getUserReducer";
import {
  productListReducer,
  productDetailReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";

const userInfo = Cookie.getJSON("userInfo") || null;
const cartItems = Cookie.getJSON("cartItems") || [];

const initialState = {
  login: { userInfo },
  cart: { cartItems, shipping: {}, payment: {} },
};

const reducer = combineReducers({
  login: userReducer,
  user: userOperationReducer,
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
