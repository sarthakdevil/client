import { configureStore } from "@reduxjs/toolkit";
import authslicereducer from "./slices/authslice";

const store = configureStore({
    reducer:authslicereducer,
    devTools:true
})
export default  store;