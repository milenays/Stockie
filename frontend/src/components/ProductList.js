import React from 'react';

const ProductList = ({ products }) => {
  // products undefined ise boş bir array olarak initialize edilir
  if (!products) {
    products = [];
  }

  return (
    <div>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product._id}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
