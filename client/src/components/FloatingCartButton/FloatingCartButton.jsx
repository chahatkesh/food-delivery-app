import React, { useContext, useState, useEffect } from "react";
import "./FloatingCartButton.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const FloatingCartButton = () => {
  const { getTotalCartAmount, cartItems } = useContext(StoreContext);
  const [showButton, setShowButton] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get total number of items in cart
  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  // Show button when there are items in cart
  useEffect(() => {
    const hasItems = getTotalCartItems() > 0;
    if (hasItems && !showButton) {
      setShowButton(true);
      setIsAnimating(true);
      // Remove animation class after animation completes
      setTimeout(() => setIsAnimating(false), 300);
    } else if (!hasItems && showButton) {
      setShowButton(false);
      setIsAnimating(false);
    }
  }, [cartItems, showButton]);

  if (!showButton) return null;

  return (
    <Link to="/cart">
      <div className={`floating-cart-button ${isAnimating ? 'animate-in' : ''}`}>
        <img src={assets.basket_icon} alt="Cart" />
        <div className="floating-cart-count">
          {getTotalCartItems()}
        </div>
        <div className="floating-cart-total">
          ₹{getTotalCartAmount()}
        </div>
      </div>
    </Link>
  );
};

export default FloatingCartButton;
