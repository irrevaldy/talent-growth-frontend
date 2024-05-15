import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Helmet } from 'react-helmet';
import companyLogo from '../images/talentLogo.png'; // Update the path to your actual logo image file

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Styled components with animations
const FormContainer = styled.form`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  animation: ${fadeIn} 1s ease-in-out;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Logo = styled.img`
  max-width: 150px;
  margin-bottom: 20px;
  animation: ${slideIn} 1s ease-in-out;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  animation: ${slideIn} 1s ease-in-out;
`;

const InputField = styled.div`
  margin-bottom: 20px;
  text-align: left;
  animation: ${slideIn} 1s ease-in-out;

  &:nth-child(even) {
    animation-delay: 0.2s;
  }

  &:nth-child(odd) {
    animation-delay: 0.4s;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
  display: block;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #0056b3;
  }
`;

const Form = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    if (!/^[a-zA-Z\s]+$/.test(formValues.name)) {
      tempErrors.name = 'Name should contain only alphabets';
    }
    if (!/^\d+$/.test(formValues.phone)) {
      tempErrors.phone = 'Phone number should contain only numbers';
    }
    if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      tempErrors.email = 'Email is not valid';
    }
    if (formValues.password.length < 6) {
      tempErrors.password = 'Password should be at least 6 characters';
    }
    if (formValues.password !== formValues.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }
    if (formValues.address.trim() === '') {
      tempErrors.address = 'Address is required';
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setErrors({ backend: data.error });
          } else {
            window.location.href = '/data'; // Redirect to the data display screen
          }
        });
    }
  };

  return (
    <>
    <Helmet>
      <title>Talent Growth Sample Application - Sign Up</title>
    </Helmet>
      <FormContainer onSubmit={handleSubmit}>
        <Logo src={companyLogo} alt="Company Logo" />
        <Title>Please fill data for sign up</Title>
        {['name', 'email', 'phone', 'password', 'confirmPassword', 'address'].map((field) => (
          <InputField key={field}>
            <Label htmlFor={field}>
              {field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
            </Label>
            <Input
              type={field === 'password' || field === 'confirmPassword' ? 'password' : 'text'}
              name={field}
              id={field}
              value={formValues[field]}
              onChange={handleChange}
            />
            {errors[field] && <Error>{errors[field]}</Error>}
          </InputField>
        ))}
        <Button type="submit">Submit</Button>
      </FormContainer>
    </>
  );
};

export default Form;