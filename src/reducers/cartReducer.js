import {
  ADD_TO_CART_ITEM,
  REMOVE_CART_ITEM,
  SHIPPING_CART_SAVE,
  PAYMENT_CART_SAVE,
} from "../constans/cartConstants";

function cartReducer(
  state = { cartItems: [], payment: {}, shipping: {} },
  action
) {
  switch (action.type) {
    case ADD_TO_CART_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, item],
      };
    case REMOVE_CART_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case SHIPPING_CART_SAVE:
      return {
        ...state,
        shipping: action.payload,
      };
    case PAYMENT_CART_SAVE:
      return {
        ...state,
        payment: action.payload,
      };
    default:
      return state;
  }
}

export { cartReducer };
