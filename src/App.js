import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import Loginpage from "./components/Loginpage";
import Profilepage from "./components/Profilepage";
import PublicRoute from "./components/Public";
import PrivateRoute from "./components/Private";
import ProductDetail from "./components/ProductDetail";
import Cartpage from "./components/Cartpage";
import Shippingpage from "./components/Shippingpage";
import Paymentpage from "./components/Paymentpage";
import { useSelector } from "react-redux";

const App = () => {
  const cart = useSelector((state) => state.cart);
  const { shipping } = cart;
  return (
    <div>
      <Router>
        <Header />
        <div className="uk-margin-top">
          <Switch>
            <PublicRoute
              restricted={false}
              path="/login"
              component={Loginpage}
            />
            <PublicRoute
              restricted={false}
              path="/about"
              component={() => <div>About</div>}
            />
            <PublicRoute
              restricted={false}
              path="/products"
              component={Homepage}
            />
            <PublicRoute
              restricted={false}
              exact
              path="/cart/:id?"
              component={Cartpage}
            />
            <PublicRoute
              restricted={false}
              path="/product/:id"
              component={ProductDetail}
            />
            <PrivateRoute exact path="/profile" component={Profilepage} />
            <PrivateRoute
              exact
              path="/payment"
              component={(props) =>
                Object.keys(shipping).length > 0 ? (
                  <Paymentpage {...props} />
                ) : (
                  <Redirect to="/shipping" />
                )
              }
            />
            <PrivateRoute exact path="/shipping" component={Shippingpage} />
            <PublicRoute
              restricted={false}
              exact={true}
              path="/"
              component={Homepage}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
