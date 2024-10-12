import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./Components/Header";

import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Admin from "./Pages/Admin";
import Login, { fakeAuth } from "./Components/Login";

import "./styles.css";

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Home} />
        <Route path="/products" component={Products} />
        <PrivateRoute path="/admin" component={Admin} />
      </Switch>
    </>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated === true ? (
          //https://reactjs.org/docs/jsx-in-depth.html#spread-attributes
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
