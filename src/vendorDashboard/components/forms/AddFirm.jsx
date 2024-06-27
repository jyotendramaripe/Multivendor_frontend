import React, { useState } from "react";
import { API_URL } from "../../utilities/apiPath";

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [image, setImage] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        console.error("user not authenticated");
      }

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);
      formData.append("image", image);
      category.forEach((item) => {
        formData.append("category", item);
      });
      region.forEach((item) => {
        formData.append("region", item);
      });

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: "POST",
        headers:{
          token: `${loginToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setImage(null);
        document.querySelector("input[type='file']").value = null;
        alert("Firm added successfully");
      }else if(data.message==="vendor can have only one firm"){
        alert("firm already exits");
      }else{
        alert('failed to add firm')
      }
        const firmId=data.firmId;
        const vendorRestaurant = data.vendorFirmName;
        localStorage.setItem('firmId',firmId);
        localStorage.setItem('vendorFirmName', vendorRestaurant)
        window.location.reload()
     
    } catch (error) {
      console.error("failed to add firm");
    }
  };
  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>
        <label>Firm Name:</label>
        <input
          type="text"
          name="firmName"
          value={firmName}
          onChange={(e) => setFirmName(e.target.value)}
        />
        <br />
        <label>Area:</label>
        <input
          type="text"
          name="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <br />
        {/* <label>Category</label>
        <input type="text" /><br /> */}
        <div className="checkInp">
          <label>Category:</label>
          <div className="inputContainer">
            <div className="regBoxContainer">
              <label>Veg</label>
              <input
                type="checkbox"
                checked={category.includes("veg")}
                onChange={handleCategoryChange}
                value="veg"
              />
            </div>
            <div className="regBoxContainer">
              <label>Non-Veg</label>
              <input
                type="checkbox"
                checked={category.includes("non-veg")}
                onChange={handleCategoryChange}
                value="non-veg"
              />
            </div>
          </div>
        </div>
        <br />
        {/* <label>Region:</label>
        <input type="text" />
        <br /> */}
        <div className="checkInp">
          <label>Region:</label>
          <div className="inputContainer">
            <div className="regBoxContainer">
              <label>South Indian</label>
              <input
                type="checkbox"
                checked={region.includes("South-Indian")}
                onChange={handleRegionChange}
                value="South-Indian"
              />
            </div>
            <div className="regBoxContainer">
              <label>North Indian</label>
              <input
                type="checkbox"
                checked={region.includes("North-Indian")}
                onChange={handleRegionChange}
                value="North-Indian"
              />
            </div>
            <div className="regBoxContainer">
              <label>Chinese</label>
              <input
                type="checkbox"
                checked={region.includes("Chinese")}
                onChange={handleRegionChange}
                value="Chinese"
              />
            </div>
            <div className="regBoxContainer">
              <label>Bakery</label>
              <input
                type="checkbox"
                checked={region.includes("Bakery")}
                onChange={handleRegionChange}
                value="Bakery"
              />
            </div>
          </div>
        </div>
        <br />
        <label>Offer:</label>
        <input
          type="text"
          name="offer"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />
        <br />
        <label>Firm Image:</label>
        <input type="file" name="image" onChange={handleImageUpload} />
        <br />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default AddFirm;
