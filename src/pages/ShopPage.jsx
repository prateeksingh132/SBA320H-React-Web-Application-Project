import { useState, useEffect } from 'react';
import axios from 'axios';

// logic: this is the shop page where i fetch and map out all the products
const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // logic: useeffect runs once when the page loads so it fetches right away
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products');

                ////////////TESTING
                // console.log('TESTING: api response data: ', response.data.products);
                ////////////

                setProducts(response.data.products);
                setLoading(false);
            } catch (error) {
                console.error("error fetching data:", error);
                setLoading(false); // still need to stop loading if it fails
            }
        };

        fetchProducts();
    }, []); // empty dependency array so it only runs once

    // logic: showing a loading animation while waiting for the api
    if (loading) {
        return (
            <div className="main_container">
                <div className="loading-text">fetching latest products...</div>
            </div>
        );
    }

    return (
        <div className="main_container">
            <h2 style={{ textAlign: 'center', borderBottom: '2px solid #ff6600', paddingBottom: '10px' }}>
                our catalog
            </h2>
            <div className="products_container">
                {/* logic: loop through products array from the api and make a card for each */}
                {products.map((product) => (
                    <div key={product.id} className="card">
                        <img src={product.thumbnail} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p className="price">${product.price}</p>
                        <p>{product.description.substring(0, 50)}...</p>
                        <button className="btn">Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopPage;