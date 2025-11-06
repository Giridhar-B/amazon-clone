import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  //  Fetch cart when user logs in or logs out
  useEffect(() => {
    if (user) fetchCartItems();
    else {
      setCartItems([]);
      setCartCount(0);
    }
  }, [user]);

  //  Recalculate total cart count whenever cartItems changes
  useEffect(() => {
    const totalQuantity = cartItems.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0
    );
    setCartCount(totalQuantity);
  }, [cartItems]);

  //  Fetch user's cart items from backend
  const fetchCartItems = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`http://localhost:5000/cart/${user.id}`);
      setCartItems(res.data);
    } catch (err) {
      console.error(" Error fetching cart:", err);
    }
  };

  //  Add product to cart
  const addToCart = async (product_id, quantity = 1) => {
    try {
      const res = await axios.post("http://localhost:5000/cart/add", {
        user_id: user.id,
        product_id,
        quantity,
      });

      if (res.status === 200) {
        await fetchCartItems(); // refresh cart instantly
      } else {
        alert(" Failed to add item to cart");
      }
    } catch (err) {
      console.error(" Add to cart error:", err);
    }
  };

  //  Remove a cart item
  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${cartItemId}`);
      setCartItems((prev) =>
        prev.filter((item) => item.cart_item_id !== cartItemId)
      );
    } catch (err) {
      console.error(" Remove from cart error:", err);
    }
  };

  //  Update quantity both locally and on backend
  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    // Update instantly in UI
    setCartItems((prev) =>
      prev.map((item) =>
        item.cart_item_id === cartItemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

    // Sync in background
    try {
      await axios.put(`http://localhost:5000/cart/${cartItemId}`, {
        quantity: newQuantity,
      });
    } catch (err) {
      console.error(" Error updating quantity:", err);
    }
  };

  //  Compute total price of all items in cart
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * Number(item.quantity),
      0
    );
  };

  //  Clear the entire cart after checkout
  const clearCart = async () => {
    try {
      if (user) {
        await axios.delete(`http://localhost:5000/cart/clear/${user.id}`);
      }
      setCartItems([]);
      setCartCount(0);
    } catch (err) {
      console.error(" Error clearing cart:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        fetchCartItems,
        getTotalPrice, 
        clearCart,     
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
