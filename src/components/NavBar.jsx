import { Link } from 'react-router-dom';

// logic: building the navbar component so users can navigate without page reloads
const NavBar = () => {
    ////////////TESTING
    // console.log('TESTING: navbar rendered');
    ////////////

    return (
        <nav className="navBar">
            <div className="logoBox">
                <Link to="/">GadgetShack</Link>
            </div>
            <ul className="navLinksList">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;