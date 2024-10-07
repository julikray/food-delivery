import React from "react";
import "./Orders.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Orders({ url }) {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from the backend
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  // Update the status of an order
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders(); // Refresh orders after updating status
      } else {
        toast.error("Error updating order status");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src="./image/parcel_icon.png" alt="Parcel Icon" />
            <div>
              {/* Display the ordered food items and their quantities */}
              <p className="order-item-food">
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>

              {/* Display customer name */}
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>

              {/* Display customer address */}
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode + ","}
                </p>
              </div>

              {/* Display customer phone number */}
              <p className="order-item-phone">{order.address.phone}</p>
            </div>

            {/* Display the number of items and total order amount */}
            <p>Items: {order.items.length}</p>
            <p>₹{order.amount}</p>

            {/* Display the payment method */}
            <p><b>Payment Method: </b>{order.paymentMethod}</p>

            {/* Order status dropdown */}
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
