import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

// logic: passing the product object down as a prop from the shoppage
const ProductCard = ({ product }) => {
    // logic: pulling the dispatch function from our global context
    const { dispatch } = useContext(CartContext);
    // logic: local state to track if this specific item was just added
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        ////////////TESTING
        // console.log('TESTING: dispatching item to cart: ', product.title);
        ////////////

        dispatch({ type: 'ADD_TO_CART', payload: product });

        // idea is that this is gonna trigger the visual feedback and then i want to reset the button
        setIsAdded(true);

        // logic: reset the button back to normal after 2 seconds
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);

    };

    return (
        <div className="card">
            {/* logic: i m wrapping the image and title in a link so the user can click it to see details */}
            <Link to={`/shop/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={product.thumbnail} alt={product.title} />
                <h3 style={{ transition: 'color 0.3s' }}>{product.title}</h3>
            </Link>
            <p className="price">${product.price}</p>
            <p>{product.description.substring(0, 50)}...</p>

            {/* here i m gonna render the button text and color based on the isadded state */}
            <button
                className="btn"
                onClick={handleAddToCart}
                style={{
                    backgroundColor: isAdded ? '#28a745' : '#ff6600', // green if added, orange if default
                    transition: 'background-color 0.3s ease'
                }}
            >
                {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
        </div>
    );
};

export default ProductCard;