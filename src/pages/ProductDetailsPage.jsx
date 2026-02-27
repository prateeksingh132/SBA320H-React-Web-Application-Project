import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

// logic: building a dedicated page for a single item
// https://stackoverflow.com/questions/77808914/how-extract-id-from-react-router-with-useparams

const ProductDetailsPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { dispatch } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSingleProduct = async () => {
            try {
                // i m passing the id variable into the dummyjson endpoint to get just one item
                const response = await axios.get(`https://dummyjson.com/products/${id}`);

                ////////////TESTING
                // console.log('TESTING: single product data: ', response.data);
                ////////////

                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error("error fetching single product:", error);
                setLoading(false);
            }
        };

        fetchSingleProduct();
    }, [id]); // logic: if the id changes, rerun the fetch

    const handleAddToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    if (loading) {
        return (
            <div className="main_container">
                <div className="loading-text">loading product details...</div>
            </div>
        );
    }

    if (!product) {
        return <div className="main_container"><h2>product not found.</h2></div>;
    }

    return (
        <div className="main_container" style={{ display: 'flex', gap: '40px', marginTop: '40px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
                <img src={product.thumbnail} alt={product.title} style={{ width: '100%', borderRadius: '8px', border: '1px solid #ddd' }} />
            </div>
            <div style={{ flex: '1', minWidth: '300px' }}>
                <h2 style={{ color: '#003366', marginTop: 0, fontSize: '2.5rem' }}>{product.title}</h2>
                <h3 className="price" style={{ fontSize: '2rem' }}>${product.price}</h3>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Rating:</strong> {product.rating} / 5</p>
                <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>{product.description}</p>

                <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
                    <button className="btn" onClick={handleAddToCart} style={{ padding: '15px 30px', fontSize: '1.1rem' }}>
                        Add to Cart
                    </button>
                    {/* logic: i m using usenavigate to create a quick back button  -https://stackoverflow.com/questions/65948671/how-to-go-back-to-previous-route-in-react-router-dom-v6 */}
                    <button className="btn" style={{ backgroundColor: '#666' }} onClick={() => navigate(-1)}>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;