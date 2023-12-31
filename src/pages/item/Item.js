import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import black_shirt from '../../black_shirt.jpg';
import plates from '../../plates.jpg';
import drill from '../../drill.jpg';

import './Item.css';

function Item() {
  const { itemNumber, itemPrice, itemDescription } = useParams();
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const parsedItemPrice = parseFloat(itemPrice);
    setItem({ name: itemDescription, price: parsedItemPrice });
    setTotalPrice(parsedItemPrice * quantity);
  }, [itemNumber, itemPrice, itemDescription, quantity]);

  let itemImage;
  switch (itemNumber) {
    case '1':
      itemImage = black_shirt;
      break;
    case '2':
      itemImage = plates;
      break;
    case '3':
      itemImage = drill;
      break;
    default:
      itemImage = '';
  }

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * item.price);
  };

  const handlerAddToCart = async () => {
    console.log('handler start');
    const myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    const data = JSON.stringify({
      "item_id": itemNumber,
      "description": itemDescription,
      "quantity": quantity,
      "price": itemPrice,
    })

    console.log(data);

    const reqOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    }

    fetch('https://25wufiftb4.execute-api.us-east-1.amazonaws.com/dev', reqOptions)
      .then(response => response.text())
      .then(result => alert(JSON.parse(result).body))
      .catch(error => console.log('error', error))
  };

  return (
    <div className='each-item'>
      <h2>{item.name}</h2>
      <img src={itemImage} alt={item.name} />
      <p>Price: ${item.price}</p>
      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        onChange={handleQuantityChange}
        min="1"
      />
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <button onClick={ handlerAddToCart }>Add to Cart</button>
    </div>
  );
}

export default Item;
