import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CookiesProvider } from 'react-cookie';

// logic: wrapping browserrouter inside cartprovider so every page and component can access the cart state
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </CookiesProvider>
  </StrictMode>,
)
