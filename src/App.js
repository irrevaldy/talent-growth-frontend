// src/App.js

import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>API URL: {process.env.REACT_APP_API_URL}</p>
        <p>API Key: {process.env.REACT_APP_API_KEY}</p>
      </header>
    </div>
  );
}

export default App;