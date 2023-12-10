import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../../Axios';

function Item() {
    const { itemNumber } = useParams();
    const [item, setItem] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    // get item details based on itemNumber when the component mounts
    useEffect(() => {
        Axios.get(`/items/${itemNumber}`)
            .then(response => {
                setItem(response.data);
                // set the default price based on the item data
                setTotalPrice(response.data.price);
            })
            .catch(error => {
                console.error('Error fetching item details:', error);
            });
    }, [itemNumber]);

    // Function to handle quantity changes
    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        setQuantity(newQuantity);
        // calculate new total
        setTotalPrice(newQuantity * item.price);
    };


    //#############################################
    //#############################################
    // push the item to the cart database
    const addToCart = () => {
        
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
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
}

export default Item;
