import React from 'react'

const Navbar = ({showLoginHandler,showRegisterHandler,showLogOut,logOutHandler}) => {
  
  const firmName=localStorage.getItem('vendorFirmName');
  return (
    <div className='navSection'>
      <div className="company">
          Vendor Dashboard
      </div>
      <div className="firmName">
        {firmName ? ( <h4>FirmName:{firmName}</h4>):null} 
      </div>
      <div className="userAuth">
        {!showLogOut ? (
         <>
            <span onClick={showLoginHandler}>Login/</span>
            <span onClick={showRegisterHandler}>Register</span>
         </>
        ):(
          <span onClick={logOutHandler}>Logout</span>
        ) }
        
      </div>
    </div>
  )
}

export default Navbar
