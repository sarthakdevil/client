import { configureStore } from "@reduxjs/toolkit";
import authslicereducer from "./slices/authslice";
import courseSliceReducer from './slices/courseslice';
import authMiddleware from "./middleware/authmiddleware";

const store = configureStore({
    reducer: {
        auth: authslicereducer,
        course: courseSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authMiddleware),
    devTools: true,
});

export default store;
