import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";

export const appStore = configureStore({
    reducer :{
        user :userReducer,
    }
})