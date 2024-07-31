import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {products: [], quantity: 0, total: 0},
    reducers: {
        addToCart: (state, action) => {
            const isExists = state.products.find(product => product.id === action.payload.id);
            if(isExists) {
                isExists.quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
                state.quantity++;
            }
            state.total = state.products.reduce((accumulator, product) => accumulator + product.price * product.quantity,0);
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload.id)
            state.quantity--;
            state.total = state.products.reduce((accumulator, product) => accumulator + product.price * product.quantity,0);
        },
        resetCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
        increaseQuantity: (state) => {
            state.quantity++;
        },
        decreaseQuantity: (state) => {
            if(state.quantity > 0) {
                state.quantity--;
            } else {
                store.dispatch(resetCart());        // COULD CALL ERRROR 
            }
        }
    }
})

export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;