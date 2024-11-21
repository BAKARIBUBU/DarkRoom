import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Create a root for the React application
const root = createRoot(document.getElementById('root'));

// Render the App component within the StrictMode
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
