import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../../Axios';
import { useAuth } from '../../AuthContext'; // Import the AuthContext

function Item() {
  const { itemNumber } = useParams();
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const { addToCart } = useAuth(); // Access the addToCart function from AuthContext

  useEffect(() => {
    Axios.get(`/items/${itemNumber}`)
      .then((response) => {
        setItem(response.data);
        setTotalPrice(response.data.price);
      })
      .catch((error) => {
        console.error('Error fetching item details:', error);
      });
  }, [itemNumber]);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * item.price);
  };

  const addToCartHandler = () => {
    // item object to add to the cart
    const cartItem = {
      id: item.id,
      name: item.name,
      picture: item.picture,
      price: item.price,
      quantity: quantity,
    };

    addToCart(cartItem); // add item to the shopping cart in AuthContext
  };

  return (
    <div>
      <h2>{item.name}</h2>
      <img src={item.picture} alt={item.name} />
      <p>Price: ${item.price}</p>
      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        onChange={handleQuantityChange}
        min="1"
      />
      <p>Total Price: ${totalPrice}</p>
      <button onClick={addToCartHandler}>Add to Cart</button>
    </div>
  );
}

export default Item;
