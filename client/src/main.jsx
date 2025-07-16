import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // <-- Import this
import './index.css';
import App from './App.jsx';
import Shop from './pages/Shop.jsx';
import './navbar.css';
import {ShopProvider} from './context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopProvider>
    <BrowserRouter> {/* <-- Wrap App inside */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
    </ShopProvider>
  </StrictMode>
);
