import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/ginger-cat-upgrade.png";

const Header = () => {
  return (
    <>
      <header>
        <div className="navLeft">
          <img className="brand-logo" src={logo} alt="nyaa-logo" />
          <a href="/">
            <h3>Nyaa</h3>
          </a>
        </div>
        <div className="navRight">
          <Link className="btn" to="/">
            Home
          </Link>
          <Link className="btn" to="/products">
            Products
          </Link>
          <Link className="btn" to="/admin">
            Admin
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
