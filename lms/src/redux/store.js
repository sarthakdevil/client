import { configureStore } from "@reduxjs/toolkit";
import authslicereducer from "./slices/authslice";
import courseSliceReducer from './slices/courseslice';
import razorpaySliceReducer from './slices/RazorpaySlice'
import lectureSliceReducer from './slices/LectureSlice'
const store = configureStore({
    reducer: {
        auth: authslicereducer,
        course: courseSliceReducer,
        razorpay:razorpaySliceReducer,
        lecture:lectureSliceReducer,
    },
    devTools: true,
});

export default store;
