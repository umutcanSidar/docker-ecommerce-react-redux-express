import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions, removeCartAction } from "../../actions/cartActions";
import { Link } from "react-router-dom";

const Cartpage = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 0;

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (productId) {
      dispatch(cartActions(productId, qty));
    }
    return () => {};
  }, []);

  return (
    <div className="uk-container">
      <div className="uk-grid">
        <div className="uk-width-1-1">
          <h1 className="uk-heading-bullet uk-margin-bottom">Shopping Cart</h1>
        </div>
        {cartItems.length > 0 ? (
          <div className="uk-width-1-1" data-uk-grid="true">
            <div className="uk-width-2-3">
              <ul className="uk-list uk-list-striped">
                {cartItems.map((el, i) => (
                  <li key={i} className="uk-flex uk-flex-middle uk-flex-around">
                    <div>
                      <img src={el.image} alt={el.name} width="50" />
                    </div>
                    <div>
                      <p className="uk-margin-remove">{el.name}</p>
                    </div>
                    <div>
                      Qty:
                      <select
                        value={el.qty}
                        onChange={(e) =>
                          dispatch(
                            cartActions(el.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(el.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <p className="uk-margin-remove">{el.price} ₺</p>
                    </div>
                    <div>
                      <button type="button" onClick={() => dispatch(removeCartAction(el.product))}><span uk-icon="icon: trash"></span></button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="uk-width-1-3">
              <div className="uk-card uk-card-default uk-width-1-1@m">
                <div className="uk-card-body">
                  <p>
                    Subtotal ({cartItems.reduce((a, b) => a + b.qty, 0)}):{" "}
                    {cartItems.reduce((a, b) => a + b.price * b.qty, 0)} ₺
                  </p>
                </div>
                <div className="uk-card-footer uk-text-center">
                  <Link
                    to="/shipping"
                    className="uk-button uk-button-default uk-width-1-1"
                    style={{ backgroundColor: "#c1c1c1", fontWeight: "bold" }}
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Your cart is empty</div>
        )}
      </div>
    </div>
  );
};

export default Cartpage;
