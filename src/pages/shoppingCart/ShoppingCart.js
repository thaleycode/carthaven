import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';

function ShoppingCart() {
  const { username, shoppingCart, removeFromCart, updateCartItemQuantity, clearShoppingCart } = useAuth();

  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    // get data when the component mounts
    const fetchData = () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-type", "application/json");

      const reqOptions = {
        mode: 'no-cors',
        method: 'GET',
        headers: myHeaders,
      };

      fetch('https://25wufiftb4.execute-api.us-east-1.amazonaws.com/dev/getCart', reqOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data && data.body) {
            const parsedData = JSON.parse(data.body); // parse JSON
            setFetchedData(parsedData); // set json data in the state
            console.log(parsedData)
          } else {
            console.error('Empty or invalid response data');
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    fetchData(); 
  }, []);
    
  
  // find total price of items in the cart
  const calculateTotalPrice = () => {
    return shoppingCart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };


  return (
    <div>
      sdfasdf
    </div>
  );
}

export default ShoppingCart;
