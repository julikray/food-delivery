import React, { useState } from "react";
import Navbar from "./compnents/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./compnents/Footer/Footer";
import Loginpop from "./compnents/Loginpop/Loginpop";
import Verify from "./pages/Verify/Verify";

function App() {

  const[showLogin , setShowLogin] = useState(false)


  return (

    <>
    {showLogin?<Loginpop  setShowLogin={setShowLogin} />:<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
