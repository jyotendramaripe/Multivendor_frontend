import React, { useEffect, useState } from "react";
import { API_URL } from "../utilities/apiPath";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const productHandler = async () => {
    const firmId = localStorage.getItem("firmId");
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductData = await response.json();
      setProducts(newProductData.products);
    } catch (error) {
      console.error("Failed to fetch products", error);
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    productHandler();
  }, []);

  const deleteProductById = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== productId));
        alert("Product deleted successfully");
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Failed to delete product", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div>
      {!products ? (
        <p>No products added</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>₹{item.price}</td>
                <td>
                  {item.image && (
                    <img
                      src={`${API_URL}/uploads/${item.image}`}
                      alt={item.productName}
                      style={{ width: "50px", height:'50px'}}
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => deleteProductById(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
