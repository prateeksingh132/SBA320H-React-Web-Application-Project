import { createContext, useReducer, useMemo } from 'react';
import { cartReducer, initialState } from '../reducers/cartReducer';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, initialState);

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