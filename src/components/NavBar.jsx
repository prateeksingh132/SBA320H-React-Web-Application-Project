import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

// logic: building the navbar component so users can navigate without page reloads
const NavBar = () => {
    ////////////TESTING
    // console.log('TESTING: navbar rendered');
    ////////////

    // logic: grabbing the state object from the context so i can read the cart array
    const { state } = useContext(CartContext);

    return (
        <nav className="navBar">
            <div className="logoBox">
                <Link to="/">GadgetShack</Link>
            </div>
            <ul className="navLinksList">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/login">Login</Link></li>
                {/* logic: dynamically updating the cart count based on the global state array length */}
                <li><Link to="/cart">Cart ({state.cart.length})</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;