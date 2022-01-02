import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";

import Cookie from "js-cookie";


import {
  productListReducer,
  productDetailReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";

const userInfo = Cookie.getJSON("userInfo") || null;
const status = Cookie.getJSON("admin");
const cartItems = Cookie.getJSON("cartItems") || [];

const initialState = {
  login: { userInfo },
  cart: { cartItems, shipping: {}, payment: {} },
};

const reducer = combineReducers({
  login: authReducer,
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
