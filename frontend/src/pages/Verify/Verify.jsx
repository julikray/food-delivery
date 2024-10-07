import React, { useContext, useEffect } from 'react';
import "./Verify.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';

function Verify() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", {
        success,
        orderId,
      });

      if (response.data.success) {
       
        navigate("/myorders");
      } else {
       
        navigate("/");
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      navigate("/"); 
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []); 

  return (
    <div className='verify'>
      <div className="spinner"></div> 
    </div>
  );
}

export default Verify;
