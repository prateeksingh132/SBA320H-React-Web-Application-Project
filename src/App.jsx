import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import ShopPage from './pages/ShopPage';

function App() {

  // logic: placed navbar above routes so it stays on the screen no matter what page we are on
  return (
    <div className="app_wrapper">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
    </div>
  );
};

export default App;