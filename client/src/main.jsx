import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// import { CartProvider } from './context/CartContext.jsx'; // Import the CartProvider
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CartProvider from './context/CartContext.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider> 
      <App />
    </CartProvider>
    <Toaster />
  </StrictMode>
);
