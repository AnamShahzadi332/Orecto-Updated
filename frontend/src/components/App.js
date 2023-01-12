import React, { useState, useEffect } from "react";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductPage";
import Cart from "../pages/Cart";
// import SignIn from "../pages/SignIn";
// import Register from "../pages/Register";
// import ShippingAddress from "../pages/ShippingAddress";
// import PaymentMethod from "../pages/PaymentMethod";
// import PlaceOrder from "../pages/PlaceOrder";
// import OrderDetails from "../pages/OrderDetails";
// import OrderHistory from "../pages/OrderHistory";
// import UserProfile from "../pages/UserProfile";
import SearchResults from "../pages/SearchResults";
import CategoryBasedPage from "../pages/CategoryBasedPage";
// import Category from "./Category";
import MyFooter from "./MyFooter";
import SellerShop from "./SellerShop";
import Checkout from "../pages/checkout";
// import Payment from "../pages/Payment";
import UserDashboard from "./UserDashboard";
import LabelBottomNavigation from "./BottomBar";
const App = (props) => {
  const [requireLogin, setrequireLogin] = useState(false);

  useEffect(() => {
    console.log(requireLogin);
  }, [requireLogin]);
  return (
    <>
      <Router>
        <Header require={requireLogin} />

        <Switch>
          <Route path="/" component={Home} exact></Route>

          {/* <Route exact path="/category" component={Category}></Route> */}
          <Route path="/products/product/:id" component={ProductPage}></Route>

          <Route path="/searchresults" component={SearchResults} exact></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/cart" component={Cart}></Route>

          <Route path="/userdashboard" component={UserDashboard}></Route>
          <Route
            path="/categorybased"
            component={CategoryBasedPage}
            exact
          ></Route>

          {/* Admin sectiojn routes */}

          <Route path="/sellershop" component={SellerShop}></Route>
        </Switch>
        <LabelBottomNavigation requirement={setrequireLogin} />
        <MyFooter />
      </Router>
    </>
  );
};

export default App;
