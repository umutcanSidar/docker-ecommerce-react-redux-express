import React from "react";
import { useSelector } from "react-redux";
// import { paymentSave, shippingSave } from "../../actions/cartActions";
import { Link } from "react-router-dom";
import Axios from "axios";

const Paymentpage = () => {
  const [payment, setPayment] = React.useState([]);
  const [ipAddress, setIpAddress] = React.useState();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping } = cart;

  const login = useSelector((state) => state.login);
  const { userInfo } = login;

  const handleChanged = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };

  const onClickedButton = async (e) => {
    e.preventDefault();
    const context = {
      cartItems: cartItems,
      shipping: shipping,
      paymentInfo: payment,
      userInfo: userInfo,
      ip: ipAddress,
    };
    await fetch("http://api.ipify.org/?format=json")
      .then((result) => result.json())
      .then((data) => setIpAddress(data.ip));
    const { data } = await Axios.post(
      "http://127.0.0.1:3000/v1/orders",
      context,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );
    console.log(data);
  };

  return (
    <div className="uk-container">
      <div className="uk-grid">
        <div className="uk-width-1-1">
          <span className="uk-margin-remove-top">
            <Link className="uk-link-heading" to="/shipping">
              <span data-uk-icon="arrow-left"></span>
              Shipping
            </Link>
          </span>
          <h1 className="uk-heading-bullet uk-margin-bottom uk-margin-remove-top">
            Order
          </h1>
        </div>
        <div className="uk-width-2-3">
          <div className="uk-card uk-card-default uk-padding-remove">
            <div className="uk-card-body">
              <table className="uk-table uk-table-justify uk-table-divider">
                <thead>
                  <tr>
                    <th className="uk-width-medium">Order Informations</th>
                    {/* <th>Table Heading</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>{shipping.firstname}</td>
                  </tr>
                  <tr>
                    <td>Last Name:</td>
                    <td>{shipping.lastname}</td>
                  </tr>
                  <tr>
                    <td>Identity Number:</td>
                    <td>{shipping.tcNo}</td>
                  </tr>
                  <tr>
                    <td>E-Mail:</td>
                    <td>{shipping.email}</td>
                  </tr>
                  <tr>
                    <td>Phone:</td>
                    <td>{shipping.tel}</td>
                  </tr>
                  <tr>
                    <td>Country/City:</td>
                    <td>
                      {shipping.country}/{shipping.city}
                    </td>
                  </tr>
                  <tr>
                    <td>Street:</td>
                    <td>{shipping.street}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="uk-width-1-3">
          <div className="uk-card uk-card-default uk-padding-remove">
            <div className="uk-card-body" style={{ padding: "20px" }}>
              <form
                className="uk-grid-small"
                data-uk-grid
                method="post"
                onSubmit={(e) => onClickedButton(e)}
              >
                <div className="uk-width-1-2">
                  <input
                    className="uk-input"
                    type="text"
                    placeholder="Cart Name"
                    name="firstname"
                    onChange={(e) => handleChanged(e)}
                  />
                </div>
                <div className="uk-width-1-2">
                  <input
                    className="uk-input"
                    type="text"
                    placeholder="Cart Surname"
                    name="surname"
                    onChange={(e) => handleChanged(e)}
                  />
                </div>
                <div className="uk-width-1-1@s">
                  <input
                    className="uk-input"
                    type="text"
                    placeholder="Cart Number"
                    maxLength="11"
                    name="cardNumber"
                    onChange={(e) => handleChanged(e)}
                  />
                </div>
                <div className="uk-width-1-4@s">
                  <div uk-form-custom="target: > * > span:first-child">
                    <select
                      className="uk-input"
                      name="month"
                      onChange={(e) => handleChanged(e)}
                    >
                      {Array.from(Array(13).keys()).map((data) => (
                        <option value={data} key={data}>
                          {data}
                        </option>
                      ))}
                    </select>
                    <button
                      className="uk-button uk-button-default"
                      type="button"
                      tabIndex="-1"
                      style={{ padding: "0 20px" }}
                    >
                      <span></span>
                      <span uk-icon="icon: chevron-down"></span>
                    </button>
                  </div>
                </div>
                <div className="uk-width-1-4@s">
                  <div uk-form-custom="target: > * > span:first-child">
                    <select
                      className="uk-input"
                      name="year"
                      onChange={(e) => handleChanged(e)}
                    >
                      {[0, 2020, 2021, 2022, 2023].map((data) => (
                        <option value={data} key={data}>
                          {data}
                        </option>
                      ))}
                    </select>
                    <button
                      className="uk-button uk-button-default"
                      type="button"
                      tabIndex="-1"
                      style={{ padding: "0 5px" }}
                    >
                      <span></span>
                      <span uk-icon="icon: chevron-down"></span>
                    </button>
                  </div>
                </div>
                <div className="uk-width-1-2@s">
                  <input
                    className="uk-input"
                    type="password"
                    placeholder="CVC"
                    maxLength="3"
                    name="cvc"
                    onChange={(e) => handleChanged(e)}
                    autoComplete="false"
                  />
                </div>
                <div>
                  <button className="uk-button uk-button-default" type="submit">
                    Pay
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paymentpage;
