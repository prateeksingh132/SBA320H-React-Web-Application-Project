import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

// logic: building the navbar component so users can navigate without page reloads
const NavBar = () => {
    ////////////TESTING
    // console.log('TESTING: navbar rendered');
    ////////////

    // logic: grabbing the state object from the context so i can read the cart array
    const { state } = useContext(CartContext);
    // logic: grabbing user state to check if logged in
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navBar">
            <div className="logoBox">
                <Link to="/">GadgetShack</Link>
            </div>
            <ul className="navLinksList">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>

                {/* i am gonna render dashboard and logout using condition if logged in, otherwise show login */}
                {user ? (
                    <>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/" onClick={logout}>Logout</Link></li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}

                {/* logic: dynamically updating the cart count based on the global state array length */}
                <li><Link to="/cart">Cart ({state.cart.length})</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;