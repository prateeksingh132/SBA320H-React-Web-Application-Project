// logic: setting up the initial state for the cart. i m gonna start with an empty array.
export const initialState = {
    cart: []
};

// logic: handling actions for the cart using a reducer like we did in class
export const cartReducer = (state, action) => {
    ////////////TESTING
    // console.log('TESTING: cart action payload: ', action.payload);
    ////////////

    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                // logic: taking the old cart array and adding the new item to the end
                cart: [...state.cart, action.payload]
            };
        default:
            return state;
    }
};