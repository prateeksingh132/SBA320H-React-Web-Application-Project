import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

// logic: passing the product object down as a prop from the shoppage
const ProductCard = ({ product }) => {
    // logic: pulling the dispatch function from our global context
    const { dispatch } = useContext(CartContext);

    const handleAddToCart = () => {
        ////////////TESTING
        // console.log('TESTING: dispatching item to cart: ', product.title);
        ////////////

        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    return (
        <div className="card">
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="price">${product.price}</p>
            <p>{product.description.substring(0, 50)}...</p>
            <button className="btn" onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;