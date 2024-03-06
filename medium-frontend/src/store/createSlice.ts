import { configureStore } from "@reduxjs/toolkit";
import UserSlice from './AuthUser/User'
import BLogSilce from './AuthUser/BLog'

const store = configureStore({
    reducer:{
        user: UserSlice,
        blog:BLogSilce
    },
})

export default store;