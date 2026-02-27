import { createContext, useReducer, useMemo, useEffect } from 'react';
import { cartReducer, initialState } from '../reducers/cartReducer';

export const CartContext = createContext();

// logic: function to check if we have a saved cart in local storage before using the default empty one
// https://kentcdodds.com/blog/how-to-optimize-your-context-value

const getInitialState = () => {
    const savedCart = localStorage.getItem('gadgetshack_cart');
    if (savedCart) {
        return JSON.parse(savedCart); // converting the string back into a object
    }
    return initialState;
};

export const CartProvider = ({ children }) => {
    // logic: passing my custom initialization function to usereducer instead of the hardcoded initialstate
    const [state, dispatch] = useReducer(cartReducer, getInitialState());

    // logic: i dea is that whenever the state changes (either by adding or removing an item), save it to local storage
    useEffect(() => {
        ////////////TESTING
        // console.log('TESTING: saving cart to local storage: ', state);
        ////////////
        localStorage.setItem('gadgetshack_cart', JSON.stringify(state));
    }, [state]);

    // logic: using usememo here just like we did in the warmup excercise in class, so it doesnt re-render the whole component tree every single time
    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};