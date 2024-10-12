import React from "react";
import { Link, Route } from "react-router-dom";
import Product from "../Components/Product";

const Products = ({ match }) => {
  const productData = [
    {
      id: 1,
      name: "Shoe 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie."
    },
    {
      id: 2,
      name: "Shoe 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie."
    },
    {
      id: 3,
      name: "Shoe 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie."
    },
    {
      id: 4,
      name: "Shoe 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie."
    }
  ];

  const productList = productData.map(product => {
    return (
      <li key={product.id}>
        <Link to={`${match.url}/${product.id}`} className="btn-left subbtn">
          {product.name}
        </Link>
      </li>
    );
  });

  return (
    <div>
      <div
        style={{
          border: "1px solid white",
          display: "block",
          justifyContent: "space-between"
        }}
      >
        <div
          style={{
            float: "left",
            padding: "10px",
            width: "30%",
            marginLeft: "auto"
          }}
        >
          <h3>Products</h3>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              listStyleType: "none",
              padding: 0,
              fontSize: "15px"
            }}
          >
            {productList}
          </ul>
        </div>
      </div>

      <Route
        path={`${match.url}/:productId`}
        //https://reactjs.org/docs/jsx-in-depth.html#spread-attributes
        render={props => <Product data={productData} {...props} />}
      />
      <Route
        exact
        path={match.url}
        render={() => (
          <div style={{ textAlign: "center" }}>Please select a product.</div>
        )}
      />
    </div>
  );
};

export default Products;
