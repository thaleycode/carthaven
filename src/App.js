import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import carthaven from './carthaven-favicon-color.svg';
import { useAuth } from './AuthContext';


import './App.css';
import './components/Footer.css';

//page imports
import Home from './pages/home/Home.js';
import Item from './pages/item/Item.js';
import ShoppingCart from './pages/shoppingCart/ShoppingCart.js';
import NewUser from './pages/newUser/NewUser.js'

function App() {

  const { isLoggedIn, username, handleLogout } = useAuth();
  
  return (
      <Router>
        <Navbar className="bg-light">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img
                alt=""
                src={carthaven}
                width="35"
                height="35"
                className="d-inline-block align-top"
              />{' '}
              CartHaven
            </Navbar.Brand>
            <Nav className="ml-auto">
              {isLoggedIn ? (
                <>
                  <Nav.Link as={Link} to="/">
                    Welcome, {username}!
                  </Nav.Link>
                  <Nav.Link as={Link} to={'/shoppingCart/:{username}'}>
                    Shopping Cart
                  </Nav.Link>
                  <Nav.Link as={Link} to="/" onClick={null}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <a href='https://carthaven.auth.us-east-1.amazoncognito.com/login?client_id=74f2kf6am2vik7tu7jad2tm36d&response_type=token&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fmain.d3r8l9a8d3hror.amplifyapp.com%2F' className='nav-link'>
                    LogIn
                  </a>
                  <Nav.Link as={Link} to="/" onClick={ handleLogout }>
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:itemNumber" element={<Item />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/newUser" element={<NewUser />} />
        </Routes>
      </Router>
  );
}

export default App;
