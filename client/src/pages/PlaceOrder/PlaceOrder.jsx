import React, { useContext, useEffect, useState, useRef } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, url, food_list, cartItems } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id]) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 99,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  const navigate = useNavigate();
  const { buttonRef } = useContext(StoreContext);

  useEffect(() => {
    if (!token) {
      navigate("/cart");
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.click();
        }
      }, 100);
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              required
              onChange={onChangeHandler}
              value={data.firstName}
              name="firstName"
              type="text"
              placeholder="First Name"
            />
            <input
              required
              onChange={onChangeHandler}
              value={data.lastName}
              name="lastName"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            value={data.email}
            name="email"
            type="email"
            placeholder="Email address"
          />
          <input
            required
            onChange={onChangeHandler}
            value={data.street}
            name="street"
            type="text"
            placeholder="Street"
          />
          <div className="multi-fields">
            <input
              required
              onChange={onChangeHandler}
              value={data.city}
              name="city"
              type="text"
              placeholder="City"
            />
            <input
              required
              onChange={onChangeHandler}
              value={data.state}
              name="state"
              type="text"
              placeholder="State"
            />
          </div>
          <div className="multi-fields">
            <input
              required
              onChange={onChangeHandler}
              value={data.pincode}
              name="pincode"
              type="text"
              placeholder="Pin Code"
            />
            <input
              required
              onChange={onChangeHandler}
              value={data.country}
              name="country"
              type="text"
              placeholder="Country"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            value={data.phone}
            name="phone"
            type="text"
            placeholder="Phone"
          />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : 99}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 99}
                </b>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
