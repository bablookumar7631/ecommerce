import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        totalQuantity: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id);
            if (item) {
              if (item.quantity < 10) {
                item.quantity = Math.min(item.quantity + action.payload.quantity, 10);
              }
            } else {
              state.cart.push({ ...action.payload, quantity: Math.min(action.payload.quantity, 10) });
            }
            // Update total quantity
            state.totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);
        },
        removeFromCart: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id);
            if (item) {
              if (action.payload.removeComplete) {
                state.cart = state.cart.filter((item) => item.id !== action.payload.id);
              } else if (item.quantity > 1) {
                item.quantity -= 1;
              } else {
                state.cart = state.cart.filter((item) => item.id !== action.payload.id);
              }
              // Update total quantity
              state.totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);
            }
        },
    },
});


export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;