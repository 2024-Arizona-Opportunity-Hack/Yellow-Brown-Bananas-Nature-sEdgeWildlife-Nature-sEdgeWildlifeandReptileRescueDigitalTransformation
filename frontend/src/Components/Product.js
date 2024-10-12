import React from "react";

const Product = ({ match, data }) => {
  const product = data.find(p => p.id === Number(match.params.productId));

  console.log("Product data: ", product);

  let productData;
  if (product) {
    productData = (
      <div className="product-section">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <hr />
      </div>
    );
  } else {
    productData = <h2>Product doesnt exists</h2>;
  }
  return <>{productData}</>;
};

export default Product;
