import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';
import CustomerProducts from './pages/CustomerProducts';
import Login from './pages/Login';
import Register from './pages/Register';
import MyOrder from './pages/UsersOrder';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import OrderDetails from './pages/OrderDetails';
import SellerOrderDetails from './pages/SellerOrderDetails';
import SellerOrder from './pages/SellerOrder';

function App() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>

      <Route path="/customer/products">
        <CustomerProducts />
      </Route>

      <Route path="/customer/checkout">
        <Checkout />
      </Route>

      <Route exact path="/customer/orders/:id">
        <OrderDetails />
      </Route>

      <Route exact path="/customer/orders">
        <MyOrder />
      </Route>

      <Route path="/register">
        <Register />
      </Route>

      <Route path="/admin/manage">
        <Admin />
      </Route>

      <Route exact path="/seller/orders/:id">
        <SellerOrderDetails />
      </Route>

      <Route exact path="/seller/orders">
        <SellerOrder />
      </Route>

      <Redirect exact from="/" to="/login" />

    </Switch>
  );
}

export default App;
