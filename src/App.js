import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import carthaven from './carthaven-favicon-color.svg';
import { AuthProvider, useAuth } from './AuthContext';
import './App.css';
import './components/Footer.css';

//pages
import Home from './pages/home/Home.js';
import LogIn from './pages/login/LogIn.js';
import ShoppingCart from './pages/shoppingCart/ShoppingCart.js';
import UserInfo from './pages/userInfo/UserInfo.js';

function App() {

  const { isLoggedIn, username, handleLogout } = useAuth();
  
  return (
    <AuthProvider>
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
                  <Nav.Link as={Link} to="/" onClick={ handleLogout }>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    LogIn
                  </Nav.Link>
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
          <Route path="/login" element={<LogIn />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/userInfo" element={<UserInfo />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
