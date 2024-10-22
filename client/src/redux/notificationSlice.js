import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: '',
        isOpen: false,
    },

    reducers:{
        showNotification: (state, action) => {
            state.message = action.payload;
            state.isOpen = true;
        },
        hideNotification: (state) => {
            state.message = '',
            state.isOpen = false;
        },
    }
});

// Export actions
export const { showNotification, hideNotification } = notificationSlice.actions;

// Export reducer
export default notificationSlice.reducer;