import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

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
                {/* logic: mapped the products to the new productcard component */}
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ShopPage;