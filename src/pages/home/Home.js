import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './Home.css';
import Footer from '../../components/Footer'; 

import black_shirt from '../../black_shirt.jpg';
import plates from '../../plates.jpg';
import drill from '../../drill.jpg';

function Home() {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const { handleLogin } = useAuth();

//get the current URL
const currentUrl = window.location.href;

// parse the URL to extract jwt token
const urlParams = new URLSearchParams(currentUrl.split('#')[1]);

// Retrieve the JWT token from a query parameter named "token" (adjust as needed)
const token = urlParams.get('id_token');

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.log('Error parsing JWT:', error);
    return null;
  }
}

if (token) {
  // if you have the token, use the `parseJwt` function to decode and parse it
  const tokenInfo = parseJwt(token);
  if (tokenInfo) {
    console.log('Decoded JWT:', tokenInfo);
    const cognitoUsername = tokenInfo['cognito:username'];
    console.log('Cognito Username:', cognitoUsername);
    console.log('this is the test ' + cognitoUsername);
    handleLogin();
  }
} else {
  console.log('Token not found in the URL.');
}

  const items = [
    { id: 1, description: 'Lucky T-shirt', price: 10, category: 'Clothing', image: black_shirt },
    { id: 2, description: 'Grandma\'s Good China', price: 29.99, category: 'Home Goods', image: plates },
    { id: 3, description: 'Electric Drill Set', price: 56.24, category: 'Tools', image: drill },
  ];

  // filter items based on keyword and category
  const filteredItems = items.filter((item) => {
    const keywordMatch = item.description.toLowerCase().includes(keyword.toLowerCase());
    const categoryMatch = category === '' || item.category === category;
    return keywordMatch && categoryMatch;
  });

  return (
    <Container className="mt-5" style={{ width: '80%', marginBottom: '400px' }}>
      <h1 className="text-center">Current Inventory</h1>
      <Row>
        <Col md={6} className="mb-3">
          <input
            type="text"
            placeholder="Search by keyword"
            className="form-control"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Col>
        <Col md={6} className="mb-3">
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Clothing">Clothing</option>
            <option value="Home Goods">Home Goods</option>
            <option value="Tools">Tools</option>
            {/* add more categories if needed */}
          </select>
        </Col>
      </Row>
      {filteredItems.length === 0 ? (
        <p className="text-center">No items match your search.</p>
      ) : (
        <Row className='item-cards'>
          {filteredItems.map((item) => (
            <Col key={item.id} md={4} className="mb-3">
              {/*link each card to the item detail page by id*/}
              <Link to={`/item/${item.id}`} key={item.id}></Link>
                <div className="card">
                  <img src={item.image} alt={item.description} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{item.description}</h5>
                    <p className="card-text">Price: ${item.price}</p>
                    <p className="card-text">Category: {item.category}</p>
                  </div>
                </div>
              <Link to={`/item/${item.id}`} key={item.id}></Link>
            </Col>
          ))}
        </Row>
      )}

      <Footer />
    </Container>
  );
}

export default Home;
