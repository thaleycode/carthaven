import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// create AuthProvider component
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);

  //for user logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

   const addToCart = (item) => {
    setShoppingCart([...shoppingCart, item]);
  };

  // remove an item from the shopping cart
  const removeFromCart = (item) => {
    const updatedCart = shoppingCart.filter((cartItem) => cartItem.id !== item.id);
    setShoppingCart(updatedCart);
  };

  const updateCartItemQuantity = (item, newQuantity) => {
    setShoppingCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
      )
    );
  };

  // funciton to clear shopping cart
  const clearShoppingCart = () => {
    setShoppingCart([]);
  };

  // provide the authentication state and functions to children components
  const value = {
    isLoggedIn,
    handleLogout,
    shoppingCart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearShoppingCart,
  };

return (
    <AuthContext.Provider value={{ value }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}