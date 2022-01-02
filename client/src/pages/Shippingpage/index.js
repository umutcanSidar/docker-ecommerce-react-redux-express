import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { shippingSave } from "../../actions/cartActions";
import HeadTitle from "../../components/HeadTitle";
const Shippingpage = (props) => {
  // CART STATE
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping } = cart;

  const [form, setForm] = React.useState([]);

  const dispatch = useDispatch();

  const onInputHandleChanged = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitted = (e) => {
    e.preventDefault();
    dispatch(shippingSave(form));
    props.history.push("/payment");
  };

  return (
    <div className="uk-container">
      <div className="uk-grid">
        <div className="uk-width-1-1 uk-margin-bottom">
          <span className="uk-margin-remove-top">
            <Link className="uk-link-heading" to="/cart">
              <span data-uk-icon="arrow-left"></span>
              Shopping Cart
            </Link>
          </span>
          <HeadTitle {...props} />
        </div>
        <div>
          <form onSubmit={(e) => onSubmitted(e)}>
            <div className="uk-grid">
              <div
                className="uk-grid-small uk-width-2-3 uk-child-width-1-1 uk-child-width-1-2@s uk-grid"
                data-uk-grid
              >
                <div>
                  <label>
                    <div className="uk-form-label uk-form-label-required">
                      First Name
                    </div>
                    <input
                      className="uk-input"
                      name="firstname"
                      type="text"
                      required=""
                      value={shipping && shipping.firstname}
                      onChange={(e) => onInputHandleChanged(e)}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    <div className="uk-form-label uk-form-label-required">
                      Last Name
                    </div>
                    <input
                      className="uk-input"
                      type="text"
                      name="lastname"
                      value={shipping && shipping.lastname}
                      required=""
                      onChange={(e) => onInputHandleChanged(e)}
                    />
                  </label>
                </div>
                <div className="uk-grid-margin">
                  <label>
                    <div className="uk-form-label uk-form-label-required">
                      TC Kimlik
                    </div>
                    <input
                      className="uk-input"
                      type="text"
                      name="tcNo"
                      required=""
                      value={shipping && shipping.tcNo}
                      onChange={(e) => onInputHandleChanged(e)}
                    />
                  </label>
                </div>
                <div className="uk-grid-margin">
                  <label>
                    <div className="uk-form-label uk-form-label-required">
                      Phone Number
                    </div>
                    <input
                      className="uk-input"
                      type="tel"
                      name="tel"
                      value={shipping && shipping.tel}
                      required=""
                      onChange={(e) => onInputHandleChanged(e)}
                    />
                  </label>
                </div>
                <div className="uk-grid-margin">
                  <label>
                    <div className="uk-form-label uk-form-label-required">
                      Email
                    </div>
                    <input
                      className="uk-input"
                      type="email"
                      name="email"
                      value={shipping && shipping.email}
                      required=""
                      onChange={(e) => onInputHandleChanged(e)}
                    />
                  </label>
                </div>
                <div className="uk-grid-margin">
                  <div className="uk-width-1-1">
                    <label>
                      <div className="uk-form-label uk-form-label-required">
                        Country
                      </div>
                      <select
                        className="uk-select"
                        name="country"
                        onChange={(e) => onInputHandleChanged(e)}
                      >
                        <option>Choose the country</option>
                        <option value="Turkey">Turkey</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="uk-grid-margin">
                  <div className="uk-width-1-1">
                    <label>
                      <div className="uk-form-label uk-form-label-required">
                        City
                      </div>
                      <input
                        className="uk-input"
                        type="text"
                        name="city"
                        value={shipping && shipping.city}
                        onChange={(e) => onInputHandleChanged(e)}
                      />
                    </label>
                  </div>
                </div>
                <div className="uk-grid-margin">
                  <div className="uk-width-1-1">
                    <label>
                      <div className="uk-form-label uk-form-label-required">
                        Street
                      </div>
                      <input
                        className="uk-input"
                        type="text"
                        name="street"
                        value={shipping && shipping.street}
                        onChange={(e) => onInputHandleChanged(e)}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="uk-width-1-3">
                <div className="uk-card uk-card-default uk-width-1-1@m">
                  {cartItems.map((el) => (
                    <div key={el.product} className="uk-card-body">
                      <h4>{el.name}</h4>
                      <div className="uk-grid-small uk-grid" uk-grid="">
                        <div className="uk-width-expand uk-first-column">
                          {/* <div className="uk-text-small">
                        Apple MacBook Pro 15" Touch Bar MPTU2LL/A 256GB (Silver)
                      </div> */}
                          <div className="uk-text-meta">
                            {el.qty} × {el.price} ₺
                          </div>
                        </div>
                        <div className="uk-text-right">
                          <div>{el.price * el.qty} ₺</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="uk-card-footer">
                    <div className="uk-grid-small uk-grid" uk-grid="">
                      <div className="uk-width-expand uk-first-column">
                        <div className="uk-text-muted">Subtotal</div>
                      </div>
                      <div className="uk-text-right">
                        <div>
                          {cartItems.reduce((a, b) => a + b.price * b.qty, 0)} ₺
                        </div>
                      </div>
                    </div>
                    <div className="uk-grid-small uk-grid" uk-grid="">
                      <div className="uk-width-expand uk-first-column">
                        <div className="uk-text-muted">Discount</div>
                      </div>
                      <div className="uk-text-right">
                        <div>- ₺</div>
                      </div>
                    </div>
                  </div>
                  <div className="uk-card-footer">
                    <div
                      className="uk-grid-small uk-flex-middle uk-grid"
                      uk-grid=""
                    >
                      <div className="uk-width-expand uk-first-column">
                        <div className="uk-text-muted">Total</div>
                      </div>
                      <div className="uk-text-right">
                        <div className="uk-text-lead uk-text-bolder">
                          {cartItems.reduce((a, b) => a + b.price * b.qty, 0)} ₺
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="uk-card-footer uk-text-center">
                    <button
                      type="submit"
                      onSubmit={(e) => onSubmitted(e)}
                      className="uk-button uk-button-default uk-width-1-1"
                      style={{ backgroundColor: "#c1c1c1", fontWeight: "bold" }}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shippingpage;
