import { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    // logic: i am gonna use basic usestate to handle a form for adding a new product to the dummyjson api
    const [newProduct, setNewProduct] = useState({ title: '', price: '', category: '' });

    const handleInputChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        try {
            ////////////TESTING
            // console.log('TESTING: sending post request for new product');
            ////////////

            // making a simple post request
            const response = await axios.post('https://dummyjson.com/products/add', {
                title: newProduct.title,
                price: Number(newProduct.price),
                category: newProduct.category
            });


            ////////////TESTING
            // console.log('TESTING: response.data', response.data');
            ////////////

            // logic: bom window alert for success
            // FUTUREWORK: add some other way to show status, maybe a floating success/failure card
            window.alert(`Success! Added ${response.data.title} with ID: ${response.data.id}`);

            // clear the form
            setNewProduct({ title: '', price: '', category: '' });

        } catch (error) {
            console.error("error adding product:", error);
            window.alert('Failed to add product.');
        }
    };

    return (
        <div className="main_container">
            <h1 style={{ borderBottom: '2px solid #ff6600', paddingBottom: '10px', textAlign: 'center' }}>
                admin dashboard
            </h1>

            <div className="card" style={{ margin: '40px auto', width: '50%', minWidth: '320px' }}>
                <h3 style={{ marginTop: 0, color: '#003366', textAlign: 'center' }}>Add New Gadget</h3>
                <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="text"
                        name="title"
                        value={newProduct.title}
                        onChange={handleInputChange}
                        placeholder="Gadget Title"
                        required
                        style={{ padding: '10px' }}
                    />
                    <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        placeholder="Price"
                        required
                        style={{ padding: '10px' }}
                    />
                    <input
                        type="text"
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        placeholder="Category"
                        required
                        style={{ padding: '10px' }}
                    />
                    <button type="submit" className="btn" style={{ backgroundColor: '#28a745' }}>
                        Add Gadget
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;