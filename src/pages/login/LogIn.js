import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import Axios from '../../Axios';

function LogIn() {
    let navigate = useNavigate();
    const { handleLogin } = useAuth(); // handleLogin function via AuthContext

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const username = data.get('username');
        const password = data.get('password');
      
        Axios.post("/login/", { username, password })
            .then(result => {
            if (result.data.info === "Logged in") {
                handleLogin(username);
                navigate('/');
            } else {
                // show error message
                alert("Login failed: " + result.data.info);
            }
            })
            .catch((error) => {
            alert("Error: " + error.message);
            });
    };
      
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Log In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter your username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Log In
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col xs={12} md={6}>
          <p className="text-center">
            Don't have an account? <Link to="/newUser">Sign Up</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default LogIn;
