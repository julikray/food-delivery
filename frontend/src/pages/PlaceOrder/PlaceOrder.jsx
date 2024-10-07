import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const { getTotalCartAmount, food_list, token, cartItems, url } =
    useContext(StoreContext);
  const [paymentMethod, setPaymentMethod] = useState(""); // New state to capture payment method
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Check if all required delivery fields are filled
  const isDeliveryInfoComplete = () => {
    const {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
    } = data;
    return (
      firstName &&
      lastName &&
      email &&
      street &&
      city &&
      state &&
      zipcode &&
      country &&
      phone
    );
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onPaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value); // Capture the selected payment method
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!isDeliveryInfoComplete()) {
      alert("Please fill in all delivery information.");
      return;
    }

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Add delivery charge
      paymentMethod, // Include the selected payment method in the request
    };

    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url, message } = response.data;

      // If Stripe is selected, redirect to the Stripe session URL
      if (paymentMethod === "Stripe") {
        window.location.replace(session_url);
      }
      // If COD is selected, show success message
      else if (paymentMethod === "COD") {
        alert(message); // Show success message for COD
        navigate("/myorders"); // Redirect to order summary page
      }
    } else {
      alert("Error placing order");
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  });

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />
        <input
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>

        <div className="multi-fields">
          <input
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />
          <input
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="cart-payment-method">
            <h2>Select Payment Method</h2>
            <div className="payment-input">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                onChange={onPaymentMethodChange}
                checked={paymentMethod === "COD"}
                disabled={!isDeliveryInfoComplete()}
              />
              <label>Cash on Delivery</label>
            </div>
            <div className="payment-input">
              <input
                type="radio"
                name="paymentMethod"
                value="Stripe"
                onChange={onPaymentMethodChange}
                checked={paymentMethod === "Stripe"}
                disabled={!isDeliveryInfoComplete()}
              />
              <label>Stripe Pay</label>
            </div>
          </div>

          <button type="submit" disabled={!isDeliveryInfoComplete()}>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
