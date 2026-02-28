// logic: setting up the initial state for the cart. i m gonna start with an empty array.
export const initialState = {
    cart: []
};

// logic: handling actions for the cart using a reducer like we did in class
// https://react.dev/learn/updating-arrays-in-state

// BUG - in my cart if i buy the same item twice, it didnt group them together. -- FIXED
// FUTUREWORK: check if its state management issue

export const cartReducer = (state, action) => {
    ////////////TESTING
    // console.log('TESTING: cart action payload: ', action.payload);
    ////////////

    switch (action.type) {
        case 'ADD_TO_CART': {
            // logic: checking if the item is already in the cart so we don't get duplicates
            const existingItem = state.cart.find((item) => item.id === action.payload.id);

            if (existingItem) {
                // logic: if it exists, map through and only update the quantity of that specific item
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === action.payload.id
                            ? { ...item, quantity: (item.quantity || 1) + 1 }
                            : item
                    )
                };
            }

            // logic: if its a brand new item, add it to the array and set its quantity to 1
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, quantity: 1 }]
            };
        }
        // logic: adding a new case to remove items from the global state array
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                // logic: filtering the array to keep everything except the item with the matching id
                cart: state.cart.filter((item) => item.id !== action.payload.id)
            };
        case 'CHANGE_QUANTITY':
            // logic: action to handle the + and - buttons on the cart page
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
            };
        // logic: i am gonna add a clear cart action so when i checkout, the cart empties out completely.
        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            };
        default:
            return state;
    }
};
