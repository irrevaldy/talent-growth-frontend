import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DataContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const DataItem = styled.div`
  margin-bottom: 10px;
`;

const BackButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const DataDisplay = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL_DEV + '/data') // Update with your backend endpoint
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      });
  }, []);

  return (
    <DataContainer>
      <h2>Form Data</h2>
      {formData.map((data, index) => (
        <DataItem key={index}>
          <strong>Name:</strong> {data.name}<br />
          <strong>Email:</strong> {data.email}<br />
          <strong>Phone:</strong> {data.phone}<br />
          <strong>Password:</strong> {data.password}<br />
          <strong>Address:</strong> {data.address}<br />
          <hr />
        </DataItem>
      ))}
      <BackButton to="/">Back to Form</BackButton>
    </DataContainer>
  );
};

export default DataDisplay;