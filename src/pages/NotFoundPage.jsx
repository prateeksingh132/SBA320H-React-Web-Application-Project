import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    ////////////TESTING
    // console.log('TESTING: 404 page rendered...');
    ////////////

    // logic: i am gonna make a simple 404 page so if the user types a wrong url they dont just get a blank screen
    return (
        <div className="main_container" style={{ textAlign: 'center', marginTop: '60px' }}>
            <h1 style={{ fontSize: '4rem', color: '#cc0000', margin: '0 0 10px 0' }}>404</h1>
            <h2 style={{ color: '#003366', marginBottom: '20px' }}>Page Not Found</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
                Sorry! cant find the page, check again.
            </p>
            <Link to="/" className="btn" style={{ textDecoration: 'none', padding: '10px 20px' }}>
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFoundPage;