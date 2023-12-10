import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import Axios from '../../Axios';

function ShoppingCart() {
    const { username, shoppingCart, removeFromCart, updateCartItemQuantity, clearShoppingCart } = useAuth();
    const [updatedCart, setUpdatedCart] = useState([...shoppingCart]);

  // find total price of items in the cart
  const calculateTotalPrice = () => {
    return shoppingCart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

    const handleRemoveFromCart = (item) => {
        removeFromCart(item); // Remove the item from the shopping cart
        setUpdatedCart(updatedCart.filter((cartItem) => cartItem.id !== item.id));
    };

    const handleQuantityChange = (item, newQuantity) => {
        // updateCartItemQuantity from authContext to update the item quantity
        updateCartItemQuantity(item, newQuantity);
    };


    const placeOrder = () => {
        const orderItems = shoppingCart.map((item) => ({
            itemId: item.id,
            quantity: item.quantity,
        }));

        // data to send
        const orderData = {
            username: username,
            items: orderItems,
        };

        // Send a POST request to your server to submit the order
        Axios.post('/api/orders', orderData)
            .then((response) => {
            
            console.log('Order submitted successfully', response.data);
            
            //clear the cart after submission
            clearShoppingCart();
            })
            .catch((error) => {
            console.error('Error submitting order', error);
            });
    
    };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {shoppingCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shoppingCart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(e, item)}
                      min="1"
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total Price: ${calculateTotalPrice().toFixed(2)}</p>
          <button onClick={placeOrder}>Place Order</button>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
