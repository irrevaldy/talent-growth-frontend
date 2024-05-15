import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import Form from './components/Form';
import DataDisplay from './components/DataDisplay';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
`;

const App = () => (
  <Router>
    <Container>
      <Helmet>
        <title>Talent Growth Sample Application - Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <Routes> {/* Use Routes instead of Route */}
        <Route path="/" element={<Form />} /> {/* Wrap Route components inside Routes */}
        <Route path="/data" element={<DataDisplay />} />
      </Routes>
    </Container>
  </Router>
);

export default App;