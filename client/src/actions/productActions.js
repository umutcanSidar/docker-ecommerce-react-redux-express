import Axios from "axios";

import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
} from "../constans/productConstans";

export const productsList = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_LIST_REQUEST });
    const { data } = await Axios.get("http://127.0.0.1:3000/v1/products/");
    dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({ type: PRODUCTS_LIST_FAIL, payload: error.response.message });
  }
};

export const productDetailAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST, payload: id });
    const { data } = await Axios.get("http://127.0.0.1:3000/v1/products/" + id);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error.response.message });
  }
};
