import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export default function Login(props) {
  const { from } = props.location.state || { from: { pathname: "/" } };
  const [redirectTo, setRedirectTo] = useState(false);

  const login = () => {
    fakeAuth.authenticate(() => {
      setRedirectTo(true);
    });
  };

  if (redirectTo) {
    return <Redirect to={from} />;
  }
  return (
    <div>
      <h2>Login Page</h2>
      <button className="btn" onClick={login}>
        Login
      </button>
    </div>
  );
}

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(c) {
    this.isAuthenticated = true;
    setTimeout(c, 100);
  }
};
