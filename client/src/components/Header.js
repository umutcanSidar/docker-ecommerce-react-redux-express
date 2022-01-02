import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";


const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // LOGIN STATE
  const login = useSelector((state) => state.login);
  const { userInfo } = login;

  // CART STATE
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const onClicked = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/login");
  };

  return (
    <div className="uk-navbar-container" data-uk-sticky>
      <div className="uk-container">
        <div className="uk-grid">
          <div className="uk-width-1-1">
            <nav className="uk-navbar" data-uk-navbar="true">
              <div className="uk-navbar-left">
                <Link className="uk-navbar-item uk-logo" to="/">
                  Logo
                </Link>
                <ul className="uk-navbar-nav">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/products/?q=&rating=">Products</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                </ul>
              </div>
              <div className="uk-navbar-right">
                <ul className="uk-navbar-nav">
                  <li>
                    {userInfo && (
                      userInfo.roleID === "superuser" ? (
                        <Link to="/admin">
                          <span>Panel</span>
                        </Link>
                      ) : null
                    )}
                  </li>
                  {userInfo && (
                    <li>
                      <a href="#">
                        {/* <img
                          className="uk-border-pill"
                          src={userInfo.image}
                          alt="Border pill"
                          width="50"
                          height="50"
                          style={{ marginRight: 10 }}
                        /> */}
                        <span>{userInfo.username}</span>
                      </a>
                      <div className="uk-navbar-dropdown uk-margin-remove">
                        <ul className="uk-nav uk-navbar-dropdown-nav">
                          <li className="uk-active">
                            <Link to="/profile">Profile</Link>
                          </li>
                          <li>
                            <a href="#">Settings</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  )}
                  <li>
                    <Link to="/cart">
                      <span data-uk-icon="cart"></span>
                      {cartItems.length !== 0 && (
                        <span className="uk-badge">
                          {cartItems.reduce((a, b) => a + b.qty, null)}
                        </span>
                      )}
                    </Link>
                    {/* <div className="uk-navbar-dropdown uk-margin-remove" data-uk-dropdown="pos:bottom-left">
                      <ul className="uk-nav uk-dropdown-nav">
                        <li className="uk-active">
                          <a href="#">Active</a>
                        </li>
                        <li>
                          <a href="#">Item</a>
                        </li>
                        <li className="uk-nav-header">Header</li>
                        <li>
                          <a href="#">Item</a>
                        </li>
                        <li>
                          <a href="#">Item</a>
                        </li>
                        <li className="uk-nav-divider"></li>
                        <li>
                          <a href="#">Item</a>
                        </li>
                      </ul>
                    </div> */}
                  </li>
                  <li>
                    {userInfo ? (
                      <a onClick={(e) => onClicked(e)}>Logout</a>
                    ) : (
                      <Link to="/login">Login</Link>
                    )}
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
