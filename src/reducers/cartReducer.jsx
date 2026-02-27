// logic: setting up the initial state for the cart. i m gonna start with an empty array.
export const initialState = {
    cart: []
};

// logic: handling actions for the cart using a reducer like we did in class
// https://react.dev/learn/updating-arrays-in-state

// BUG - in my cart if i buy the same item twice, it didnt group them together.
// FUTUREWORK: check if its state management issue

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
        // logic: adding a new case to remove items from the global state array
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                // logic: filtering the array to keep everything except the item with the matching id
                cart: state.cart.filter((item) => item.id !== action.payload.id)
            };
        default:
            return state;
    }
};