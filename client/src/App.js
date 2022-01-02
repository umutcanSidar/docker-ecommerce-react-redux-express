import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// COMPONENTS
import Header from "./components/Header";
import PublicRoute from "./components/Public";
import PrivateRoute from "./components/Private";
// PAGES
import Productspage from "./pages/Productspage";
import Loginpage from "./pages/Loginpage";
import Profilepage from "./pages/Profilepage";
import ProductDetail from "./pages/ProductDetail";
import Cartpage from "./pages/Cartpage";
import Shippingpage from "./pages/Shippingpage";
import Paymentpage from "./pages/Paymentpage";
import Adminpage from "./pages/Adminpage";
import Homepage from './pages/Homepage'

const App = () => {
  const cart = useSelector((state) => state.cart);
  const { shipping } = cart;
  return (
    <div>
      <Router>
        <Header />
        <div className="uk-margin-top uk-margin-large-bottom">
          <Switch>
            <PrivateRoute path="/admin" component={Adminpage} />
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
              component={Productspage}
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
