import { configureStore } from "@reduxjs/toolkit";
import authslicereducer from "./slices/authslice";
import courseSliceReducer from './slices/courseslice';

const store = configureStore({
    reducer: {
        auth: authslicereducer,
        course: courseSliceReducer,
    },
    devTools: true,
});

export default store;
