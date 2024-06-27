import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <>
      <div className="errorSection">
        <h1>404</h1>
        <div>PAGE NOT FOUND</div>
        <Link to="/" style={{fontSize:"1.2rem", color:"blue"}}><p>Go Back</p></Link>
      </div>
    </>
  );
};

export default NotFound;
