import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

// logic: this page reads the global cart state and calculates the total price

// BUG - in my cart if i buy the same item twice, it didnt group them together. 
// FUTUREWORK: check if its state management issue

const CartPage = () => {
    const { state, dispatch } = useContext(CartContext);

    ////////////TESTING
    // console.log('TESTING: current cart state: ', state.cart);
    ////////////

    // logic: using reduce method to add up all the prices in the array
    const totalCost = state.cart.reduce((total, item) => total + item.price, 0);

    const handleRemove = (item) => {
        // dispatching the remove action to my usereducer
        dispatch({ type: 'REMOVE_FROM_CART', payload: item });
    };

    return (
        <div className="main_container">
            <h2 style={{ textAlign: 'center', borderBottom: '2px solid #ff6600', paddingBottom: '10px' }}>
                your shopping cart
            </h2>

            {/* again, just like before i m rendering a message if the cart is empty */}
            {state.cart.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '1.2rem' }}>
                    your cart is currently empty.
                </p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                    {/* logic: mapping out the cart items. reusing my card css but overriding flex direction so its a list instead of a grid */}
                    {state.cart.map((item, index) => (
                        <div key={index} className="card" style={{ width: '100%', flexDirection: 'row', alignItems: 'center', padding: '10px 20px' }}>
                            <img src={item.thumbnail} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '20px' }} />

                            <div style={{ flexGrow: 1 }}>
                                <h4 style={{ margin: '0 0 10px 0' }}>{item.title}</h4>
                                <p className="price" style={{ margin: 0 }}>${item.price}</p>
                            </div>

                            <button
                                className="btn"
                                style={{ backgroundColor: '#cc0000' }}
                                onClick={() => handleRemove(item)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <div style={{ textAlign: 'right', marginTop: '20px' }}>
                        {/* logic: i m gonna use tofixed(2) which makes sure the total always has two decimal places like real money */}
                        <h2>Total: ${totalCost.toFixed(2)}</h2>
                        <button className="btn" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;