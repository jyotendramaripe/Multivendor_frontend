import React,{useState}from "react";
import { API_URL } from "../../utilities/apiPath";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestSeller =(event) =>{
    const value = event.target.value === 'true';
    setBestSeller(value);
  }

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem("firmId");
      if (!loginToken || !firmId) {
        console.error("user not authenticated");
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);
      category.forEach((item) => {
        formData.append("category", item);
      });
      formData.append("bestSeller", bestSeller);
      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert("Product added successfully");
        setProductName("");
        setPrice("");
        setCategory([]);
        setBestSeller(false);
        setDescription("");
        setImage(null);
        document.querySelector("input[type='file']").value = null;
      }
    } catch (error) {
      console.error(data.message);
      alert('falied to add product')
    }
  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleProductSubmit}>
        <h3>Add Product</h3>
        <label>Product Name</label>
        <input type="text" name="productName" value={productName} onChange={(e)=>setProductName(e.target.value)}/>
        <br />
        <label>Price</label>
        <input type="text"  name="price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
        <br />
        <div className="checkInp">
          <label>Category:</label>
          <div className="inputContainer">
            <div className="regBoxContainer">
              <label>Veg</label>
              <input type="checkbox" checked={category.includes("veg")}
                onChange={handleCategoryChange}
                value="veg" />
            </div>
            <div className="regBoxContainer">
              <label>Non-Veg</label>
              <input type="checkbox" checked={category.includes("non-veg")}
                onChange={handleCategoryChange}
                value="non-veg" />
            </div>
          </div>
        </div>
        <br />
        <div className="checkInp">
          <label>Best Seller:</label>
          <div className="inputContainer">
            <div className="regBoxContainer">
              <label>Yes</label>
              <input type="radio" value="true" checked ={bestSeller===true} onChange={handleBestSeller}/>
            </div>
            <div className="regBoxContainer">
              <label>No</label>
              <input type="radio" value="false" checked ={bestSeller===false} onChange={handleBestSeller}/>
            </div>
          </div>
        </div>
        <br />
        <label>Description</label>
        <input type="text" name="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <br />
        <label>Product Image</label>
        <input type="file" name="image" onChange={handleImageUpload}/>
        <br />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default AddProduct;
