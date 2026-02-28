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

    // logic: new state for the dropdown filter
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // logic: useeffect runs once when the page loads so it fetches right away
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products');


                ////////////TESTING
                // console.log('TESTING: api response data: ', response.data.products);
                ////////////

                const fetchedProducts = response.data.products;

                setProducts(fetchedProducts);

                // logic: extracting all unique categories from the api data so i can build the dropdown options dynamically
                // https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
                const uniqueCats = [...new Set(fetchedProducts.map(item => item.category))];
                setCategories(uniqueCats);

                setLoading(false);
            } catch (error) {
                console.error("error fetching data:", error);
                setLoading(false); // still need to stop loading if it fails
            }
        };

        fetchProducts();
    }, []); // empty dependency array so it only runs once


    // const filteredProducts = products.filter((product) =>
    //     product.title.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    ////////////TESTING
    // console.log('TESTING: search term is: ', searchTerm);
    // console.log('TESTING: filtered products count: ', filteredProducts.length);
    ////////////

    // logic: filtering the products array so it only keeps items that match the search string
    // i used tolowercase() on both so the search isnt case sensitive
    // https://stackoverflow.com/questions/73272927/in-react-js-i-want-to-be-able-to-search-username-without-distinguishing-between
    //  now filtering by both the text search and the category dropdown
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

        // i wanna make sure that it only returns true if it passes both checks
        return matchesSearch && matchesCategory;
    });

    ////////////TESTING
    // console.log('TESTING: selected category: ', selectedCategory);
    // console.log('TESTING: available categories: ', categories);
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
            {/* i m now wrapping the inputs in a flexbox so they sit next to each other nicely */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px 0', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder="search for a gadget..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '12px',
                        width: '300px',
                        borderRadius: '4px',
                        border: '2px solid #003366',
                        fontSize: '1rem'
                    }}
                />

                {/* this is the dropdown thats gonna map over the unique categories array */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                        padding: '12px',
                        borderRadius: '4px',
                        border: '2px solid #003366',
                        fontSize: '1rem',
                        backgroundColor: 'white',
                        cursor: 'pointer'
                    }}
                >
                    <option value="all">All Categories</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="products_container">
                {/* logic: mapping over the filtered array instead of the raw products array */}
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p style={{ textAlign: 'center', width: '100%', fontSize: '1.2rem', color: '#cc0000' }}>
                        no gadgets found. try changing your filters.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ShopPage;