import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CheckoutPage = () => {
    // logic: i am gonna pull dispatch to clear the cart and usenavigate to redirect the user
    const { state, dispatch } = useContext(CartContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        cardNumber: ''
    });

    // calculating total just to show them what they are paying
    const totalCost = state.cart.reduce((total, item) => total + item.price, 0);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckoutSubmit = (e) => {
        e.preventDefault();

        ////////////TESTING
        // console.log('TESTING: order placed by: ', formData.name);
        ////////////

        // i m gonna use bom window.alert for now, will change later
        // FUTUREWORK: add some other way to show status
        window.alert(`Order Placed Successfully! Thank you, ${formData.name}.`);

        // logic: empty the cart and kick them to home
        dispatch({ type: 'CLEAR_CART' });
        navigate('/');
    };

    // logic: if user try to go to checkout with an empty cart, tell them to go back
    if (state.cart.length === 0) {
        return (
            <div className="main_container" style={{ textAlign: 'center' }}>
                <h2>your cart is empty!</h2>
                <button className="btn" onClick={() => navigate('/shop')}>go to shop</button>
            </div>
        );
    }

    return (
        <div className="main_container">
            <div className="card" style={{ margin: '40px auto', width: '50%', minWidth: '320px' }}>
                <h2 style={{ textAlign: 'center', color: '#003366', borderBottom: '2px solid #ff6600', paddingBottom: '10px' }}>
                    secure checkout
                </h2>
                <h3 style={{ textAlign: 'center' }}>Order Total: <span className="price">${totalCost.toFixed(2)}</span></h3>

                <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required style={{ padding: '10px' }} />
                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Shipping Address" required style={{ padding: '10px' }} />
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="Credit Card" required style={{ padding: '10px' }} />

                    <button type="submit" className="btn">Place Order</button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;