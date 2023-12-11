import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NewUser() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    creditCardNumber: '',
    expirationDate: '',
  });

    const [submitMessage, setSubmitMessage] = useState('');
    const navigate = useNavigate();

  /*
  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the form to the server using Axios
    Axios.post("/register/", formData)
      .then((result) => {
        if (result.data.success) {
          setSubmitMessage('Registration successful!'); // success message
            navigate('/');
        } else {
          setSubmitMessage('Registration failed. Please try again.'); // Display error message
        }
      })
      .catch((error) => {
        setSubmitMessage('An error occurred while registering. Please try again later.');
        console.error(error);
      });
  };
*/
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container>
      <h2 className="text-center mt-4">New User Registration</h2>
      <Form onSubmit={null}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Add similar Row and Form.Group blocks for other input fields */}

        <Button variant="primary" type="submit" className="w-100 mt-3">
          Register
        </Button>
      </Form>
      {submitMessage && <p className="mt-3">{submitMessage}</p>}
    </Container>
  );
}

export default NewUser;
