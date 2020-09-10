import Axios from "axios";
import { ADD_TO_CART_ITEM, REMOVE_CART_ITEM,SHIPPING_CART_SAVE, PAYMENT_CART_SAVE } from "../constans/cartConstants";
import Cookie from "js-cookie";

export const cartActions = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get("http://127.0.0.1:3000/v1/products/" + id);
    dispatch({
      type: ADD_TO_CART_ITEM,
      payload: {
        product: data.product._id,
        name: data.product.name,
        image: data.product.image,
        price: data.product.price,
        countInStock: data.product.countInStock,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    
    Cookie.set("cartItems", JSON.stringify(cartItems))
  } catch (error) {
    console.log(error)
  }
};

export const removeCartAction = (id) => (dispatch, getState) => {
    dispatch({type: REMOVE_CART_ITEM, payload: id});
    const {cart: {cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems))
}

export const shippingSave = (data) => (dispatch) => {
  dispatch({type: SHIPPING_CART_SAVE, payload: data});
}

export const paymentSave = (data) => (dispatch) => {
  dispatch({type: PAYMENT_CART_SAVE, payload: data});
}