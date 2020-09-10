import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
} from "../constans/productConstans";

// LIST REDUCER
export function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCTS_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case PRODUCTS_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCTS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

// DETAIL REDUCER
export function productDetailReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return {
        laoding: true,
      };
    case PRODUCT_DETAIL_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
