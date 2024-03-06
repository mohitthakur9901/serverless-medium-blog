import { createSlice } from '@reduxjs/toolkit';

interface User {
    user: {
        id:string;
        name?: string;
        email:string;

    }    
    token:string
}

const initialState: User = {
    user: {
        id: '',
        name: '',
        email: ''
    }, 
    token: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        removeUser(state) {
            state.user = initialState.user;
            state.token = '';
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
