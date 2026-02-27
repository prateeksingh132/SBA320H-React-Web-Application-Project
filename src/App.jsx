import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import ShopPage from './pages/ShopPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoutes from './components/ProtectedRoutes';
import CartPage from './pages/CartPage';

function App() {

  // logic: placed navbar above routes so it stays on the screen no matter what page we are on
  return (
    <div className="app_wrapper">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* adding protected route wrapper for the dashboard */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;