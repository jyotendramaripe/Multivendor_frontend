import React, { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AddFirm from "../components/forms/AddFirm";
import AddProduct from "../components/forms/AddProduct";
import Welcome from "../components/Welcome";
import AllProducts from "../components/AllProducts";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  useEffect(()=>{
    const loginToken=localStorage.getItem('loginToken');
    if(loginToken){
      setShowLogOut(true);
    }
  },[])

  useEffect(()=>{
    const firmName=localStorage.getItem('vendorFirmName');
    if(firmName){
      setShowFirmTitle(false);
    }
  },[])

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showFirmHandler = () => {
    if(showLogOut){
      setShowFirm(true);
      setShowRegister(false);
      setShowLogin(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    }else{
      alert('please Login First')
      setShowLogin(true);
      setShowRegister(false);
    }
   
  };

  const showProductHandler = () => {
    if(showLogOut){
      setShowProduct(true);
      setShowFirm(false);
      setShowRegister(false);
      setShowLogin(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    }else{
      alert('Please Login First');
      setShowLogin(true);
      setShowRegister(false);
    }
  
  };

  const showWelcomeHandler = () => {
    setShowProduct(false);
    setShowFirm(false);
    setShowRegister(false);
    setShowLogin(false);
    setShowWelcome(true);
    setShowAllProducts(false);
  };
  const showAllProductsHandler = () => {
    if(showLogOut){
      setShowProduct(false);
      setShowFirm(false);
      setShowRegister(false);
      setShowLogin(false);
      setShowWelcome(false);
      setShowAllProducts(true);
    }else{
      alert('Please Login First');
      setShowLogin(true);
      setShowRegister(false);
    }
   
  };

  const logOutHandler=()=>{
    confirm('Are you sure you want to logout?')
      localStorage.removeItem('loginToken');
      localStorage.removeItem('firmId');
      localStorage.removeItem('vendorFirmName')
      setShowLogOut(false);
      setShowFirmTitle(true);
      // setShowAllProducts(false);
      // setShowProduct(false);
  }

  return (
    <>
      <section className="landingSection">
        <Navbar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogOut={showLogOut}
          logOutHandler={logOutHandler}
        />
        <div className="collectionSection">
          <Sidebar
            showFirmHandler={showFirmHandler}
            showProductHandler={showProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showFirmTitle={showFirmTitle}
          />
         {showLogin && <Login showWelcomeHandler={showWelcomeHandler} setShowLogOut={setShowLogOut} setShowFirmTitle={setShowFirmTitle} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
          {showFirm && showLogOut && <AddFirm />}
          {showProduct && showLogOut && <AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts && showLogOut &&<AllProducts />}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
