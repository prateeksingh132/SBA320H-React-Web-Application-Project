import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

// logic: this is the shop page where i fetch and map out all the products
// https://stackoverflow.com/questions/58579426/in-useeffect-whats-the-difference-between-providing-no-dependency-array-and-an

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // logic: new state to track what the user types in the search box
    const [searchTerm, setSearchTerm] = useState('');

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

    // logic: filtering the products array so it only keeps items that match the search string
    // i used tolowercase() on both so the search isnt case sensitive
    // https://stackoverflow.com/questions/73272927/in-react-js-i-want-to-be-able-to-search-username-without-distinguishing-between
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    ////////////TESTING
    // console.log('TESTING: search term is: ', searchTerm);
    // console.log('TESTING: filtered products count: ', filteredProducts.length);
    ////////////


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

            {/* added a simple search input right above the product cards */}
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <input
                    type="text"
                    placeholder="search for a gadget..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '12px',
                        width: '350px',
                        borderRadius: '4px',
                        border: '2px solid #003366',
                        fontSize: '1rem'
                    }}
                />
            </div>

            <div className="products_container">
                {/* logic: mapping over the filtered array instead of the raw products array */}
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p style={{ textAlign: 'center', width: '100%', fontSize: '1.2rem', color: '#cc0000' }}>
                        no gadgets found matching "{searchTerm}".
                    </p>
                )}
            </div>
        </div>
    );
};

export default ShopPage;